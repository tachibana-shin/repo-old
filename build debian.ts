import chalk from "chalk";
import fs from "fs";
import { join, dirname, basename } from "path";
import child_process from "child_process";
import md5file from "md5-file";
import semver from "semver";

const PATH_BUILD_PACKAGES = join(__dirname, ".build-packages");
const PATH_PACKAGES = join(__dirname, "packages");
const PATH_FILE_PACKAGES = join(__dirname, "Packages");
const ORIGIN = "https://tachibana-shin.github.io";
const HOMEPAGE = "https://tachibana-shin.github.io/repo";
const PATH_TMP_UNPACK_DEBIAN = join(__dirname, ".tmp");

type ControlJSON = {
  [key: string]: string;
} & {
  Package: string;
  Version: string;
  Homepage?: string;
  Maintainer?: string;
  Sponsor?: string;
  Depiction?: string;
};
type ControlJSONFile = {
  filepath: string;
  control: ControlJSON;
};

// load split file or chunks

console.clear();
console.log(chalk.grey("reading packages..."));

function parseControl(control: string): ControlJSON {
  const obj = {} as any;

  control
    .split("\n")
    .filter((item) => !!item.replace(/\s/g, ""))
    .forEach((line) => {
      const split = line.split(": ");

      obj[split[0].trim()] = split.slice(1).join(": ").trim();
    });

  return obj;
}

function stringifyControl(obj: ControlJSON): string {
  return Object.entries(obj).reduce((prev, [key, val]) => {
    return `${prev}${key.trim()}: ${val.trim()}\n`;
  }, "");
}

async function main() {
  if (
    fs.existsSync(PATH_PACKAGES) === false ||
    fs.lstatSync(PATH_PACKAGES).isDirectory() === false
  ) {
    throw new Error(`${join(__dirname, "packages")} is not directory`);
  }

  // auto fix packages
  const controlPackages = autoFixPermissionAndControlPackage(
    await getListPackages()
  );

  // get list packages merged version
  createDepictionPackages(controlPackages);

  // all package ready, create Packages, Packages.bz2
  createFilePackages();

  // create Release
  createFileRelease();
}
main();
function createDepictionPackages(controls: ControlJSONFile[]): void {
  const packages = uniqueListPackages(controls);

  fs.mkdirSync(join(__dirname, "controls"), {
    recursive: true,
  });

  packages.forEach((versions) => {
    // write JSON to depiction
    fs.writeFileSync(
      join(__dirname, "controls", versions[0].control.Package),
      JSON.stringify(
        versions.map((item) => {
          const { size, birthtimeMs, uid } = fs.lstatSync(item.filepath);

          return {
            ...item.control,
            MD5sum: md5file.sync(item.filepath),
            size,
            birthtimeMs,
            uid,
          };
        })
      )
    );
  });
}

function uniqueListPackages(
  controls: ControlJSONFile[]
): Map<string, ControlJSONFile[]> {
  const packages = new Map<string, ControlJSONFile[]>();

  controls.forEach((controlFile) => {
    if (packages.has(controlFile.control.Package) === false) {
      packages.set(controlFile.control.Package, []);
    }

    const indexInsert =
      packages
        .get(controlFile.control.Package)!
        .findIndex(({ control: { Version } }) =>
          semver.gt(Version, controlFile.control.Version)
        ) || packages.get(controlFile.control.Package)!.length;

    packages
      .get(controlFile.control.Package)!
      .splice(indexInsert, 0, controlFile);
  });

  return packages;
}

async function getListPackages(): Promise<ControlJSONFile[]> {
  return fs
    .readdirSync(PATH_PACKAGES)
    .map((filename) => {
      const pathToPackage = join(PATH_PACKAGES, filename);

      if (fs.lstatSync(pathToPackage).isFile() === false) {
        return;
      }

      // read debian/control
      return {
        filepath: pathToPackage,
        control: parseControl(
          child_process.execSync(`dpkg -f "${pathToPackage}"`).toString()
        ),
      };

      // edit properties: Package: git.shin.???
      // 					Homepage: https://tachibana-shin.github.io/
      // 					Maintainer: tachibana-shin<tachib.shin@gmail.com>
      //					Sponsor: tachibana-shin<https://tachibana-shin.github.io>
      //					Depiction: https://tachibana-shin.github.io/repo/package/${package} or /description.html?id=${package} or /description/${package}
      // https://tachibana-shin.github.io/repo/description?id=${package}
    })
    .filter(Boolean);
}

function autoFixPermissionAndControlPackage(
  controlPackages: ControlJSONFile[]
): ControlJSONFile[] {
  return controlPackages.map((controlFile) => {
    const { control, filepath } = controlFile;
    const uniqueControl = JSON.stringify(control);

    // check file is not change by MD5 break code.

    if (control.Package.startsWith("git.shin") === false) {
      control.Package = `git.shin.${control.Package}`;
    }
    control.Homepage = HOMEPAGE;
    control.Maintainer = "tachibana-shin<tachib.shin@gmail.com>";
    control.Sponsor = "tachibana-shin<https://tachibana-shin.github.io>";
    control.Depiction = `${HOMEPAGE}/package/${control.Package}`; // no report old versions package

    if (uniqueControl !== JSON.stringify(control)) {
      updatePackage(filepath, control);
    }

    return controlFile;
  });
}
function autoFixFilenamePackage(controlPackages: ControlJSONFile[]): void {
  controlPackages.forEach((controlFile) => {
    if (
      basename(controlFile.filepath) !==
      `${controlFile.control.Package}@${controlFile.control.Version}.deb`
    ) {
      // rename
      fs.renameSync(
        join(
          dirname(controlFile.filepath),
          `${controlFile.control.Package}@${controlFile.control.Version}.deb`
        ),
        controlFile.filepath
      );
    }
  });
}

function updatePackage(filepath: string, control: ControlJSON): void {
  try {
    fs.rmSync(`${PATH_TMP_UNPACK_DEBIAN}`, {
      recursive: true,
    }); // rm .tmp why?
  } catch {}
  child_process.execSync(
    `dpkg-deb -R "${filepath}" "${PATH_TMP_UNPACK_DEBIAN}"`
  );

  const pathTmpControl = join(PATH_TMP_UNPACK_DEBIAN, "DEBIAN/control");
  if (fs.statSync(pathTmpControl).mode < 644) {
    fs.chmodSync(pathTmpControl, "0644");
  }
  fs.readdirSync(join(PATH_TMP_UNPACK_DEBIAN, "DEBIAN")).forEach((filename) => {
    if (filename !== "control") {
      fs.chmodSync(join(PATH_TMP_UNPACK_DEBIAN, "DEBIAN", filename), "0755");
    }
  });

  fs.writeFileSync(pathTmpControl, stringifyControl(control));

  child_process.execSync(`dpkg -bR "${PATH_TMP_UNPACK_DEBIAN}" "${filepath}"`);

  console.log(`register ${control.Package}`);
}

function createFilePackages(): void {
  child_process.execSync(`sh ./ftparchive-build.sh`);
}

function createFileRelease(): void {
  fs.writeFileSync(
    "Release",
    `Origin: Tachibana Shin (たちばなしん)
Label: Tachibana Shin (たちばなしん)
Suite: stable
Version: 1.0
Codename: ios
Architecture: iphoneos-arm
Components: main
Description: Repo DEBIAN packages for Cydia / Installer 5 of the Tachibana Shin (たちばなしん)
MD5Sum:
 ${md5file.sync(PATH_FILE_PACKAGES)} ${
      fs.statSync(PATH_FILE_PACKAGES).size
    } Packages
 ${md5file.sync(`${PATH_FILE_PACKAGES}.bz2`)} ${
      fs.statSync(`${PATH_FILE_PACKAGES}.bz2`).size
    } Packages.bz2`
  );
}
