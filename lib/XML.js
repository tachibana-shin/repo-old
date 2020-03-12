var XML = {
parse: function (data) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		xml = new window.DOMParser().parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = my(xml);
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		throw ( "Invalid XML: " + data );
	}
	return xml;
},
stringify: function (xml) {
    return xml.outerHTML || xml.documentElement.outerHTML
}
}