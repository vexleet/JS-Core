function validateResult(obj) {
    let methods = ["GET", "POST", "DELETE", "CONNECT"];
    let versions = ["HTTP/0.9", "HTTP/1.0", "HTTP/1.1", "HTTP/2.0"];
    let messageRegex = /[<>\\&'"]+/g;
    let uriRegex = /^[A-Za-z0-9\.\*]+$/g;

    if (!obj.hasOwnProperty("method")) {
        throw new Error("Invalid request header: Invalid Method");
    }
    else if (!obj.hasOwnProperty("uri")) {
        throw new Error("Invalid request header: Invalid URI");
    }
    else if (!obj.hasOwnProperty("version")) {
        throw new Error("Invalid request header: Invalid Version");
    } else if (!obj.hasOwnProperty("message")) {
        throw new Error("Invalid request header: Invalid Message");
    }

    if (!methods.includes(obj.method)) {
        throw new Error("Invalid request header: Invalid Method");
    }
    else if (!uriRegex.exec(obj.uri) || obj.uri === "") {
        throw new Error("Invalid request header: Invalid URI");
    }
    else if (!versions.includes(obj.version)) {
        throw new Error("Invalid request header: Invalid Version");
    }
    else if (messageRegex.exec(obj.message)) {
        throw new Error("Invalid request header: Invalid Message");
    }

    return obj;
}

console.log(validateResult({
    method: 'GET',
    uri: 'svn.public.catalog',
    version: 'HTTP/1.1',
    message: ''
}));