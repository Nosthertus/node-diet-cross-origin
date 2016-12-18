var utils = require("utils-pkg");

/**
 * Parses options of the package
 * 
 * @param  {Object} options The object options provided
 * @return {Object}         The parsed object options
 */
module.exports.parseOptions = (options) => {
	if(options == null){
		throw new Error("Options is undefined");
	}

	else if(!utils.isObject(options)){
		throw new Error("Options parameter must be an object");
	}

	else{
		var values = {};

		// Iterate for each default option from the module
		for(prop in module.parent.options.defaults){
			var property = module.parent.options.defaults[prop];

			// Check for allow-headers option
			if(prop == "allow-headers" && property != null){
				property = parseAllowHeader(property, prop);
			}

			values[prop] = options.defaults ? options.defaults[prop] : property;
		}

		return {
			values: values
		};
	}
};

function parseAllowHeader(value, name){
	// Throw error if value is not array or string
	if(value && (!utils.isArray(value) || !utils.isString(value))){
		throw new Error(`Default Header for "${name}" must be Array or String`);
	}

	// In case when no error was threw, check if value is array
	// Set all values to UpperCase and join the values into a string
	else if(utils.isArray(value)){
		for(i = 0; i < value.length; i++){
			value[i] = value[i].toUpperCase();
		}

		value = value.join(", ");
	}

	// When value is string, make sure it's in UpperCase
	else{
		value = value.toUpperCase();
	}

	return value;
}