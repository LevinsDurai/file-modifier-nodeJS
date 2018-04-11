function get_cookie(cookie_name) {
    var results = document && document.cookie.match(cookie_name + '=(.*?)(;|$)');
    if (results) {
        return (unescape(results[1]));
    }
    return null;
}


function apiCallerCreater(zd_tt_csrf) {
    return function requestAPI(url) {
        var core = {
            ajax: function(method, url, args, payload, files, headersArray) {
                return new Promise(function(resolve, reject) {
                    var client = new XMLHttpRequest();
                    var uri = url;
                    var data = "";
                    if (args && (method === 'POST' || method === 'PUT')) {
                        var argcount = 0;
                        for (var key in args) {
                            if (args.hasOwnProperty(key)) {
                                if (argcount++) {
                                    data += '&';
                                }
                                data += encodeURIComponent(key) + '=' + encodeURIComponent(args[key]);
                            }
                        }
                    }
                    client.open(method, uri);
                    client.setRequestHeader("X-Requested-With", "XMLHttpRequest");
                    client.setRequestHeader("X-ZCSRF-TOKEN", "crmcsrfparam=" + zd_tt_csrf);
                    if (headersArray) {
                        for (i = 0; i < headersArray.length; i++) {
                            client.setRequestHeader(Object.keys(headersArray)[0], Object.values(headersArray)[0]);
                        }


                    }
                    if (files) {
                        var data = new FormData();
                        data.append("file", files[0]);
                        client.send(data);
                    } else if (payload) {
                        client.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                        client.send(JSON.stringify(payload));
                    } else {
                        client.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        client.send(data);
                    }


                    client.onload = function() {
                        if (this.status === 200 || this.status === 201) {
                            if (this.readyState === 4) {
                                var response = this.response ? this.response : this.responseText;
                                if (response === "") {
                                    resolve({
                                        responseStatus: this.status
                                    });
                                } else {
                                    try {
                                        resolve({
                                            responseStatus: this.status,
                                            obj: JSON.parse(response)
                                        });
                                    } catch (e) {
                                        resolve({
                                            responseStatus: this.status,
                                            "res": "done"
                                        });
                                    }
                                }
                            }
                        } else if (this.status === 204) {
                            if (this.readyState === 4) {
                                var response = this.response ? this.response : this.responseText;
                                if (response === "") {
                                    response = "emptyResponse";
                                }
                                resolve({
                                    responseStatus: this.status,
                                    data: response
                                });
                            }
                        } else if (this.status === 400 && this.readyState === 4) {
                            var response = this.response ? this.response : this.responseText;
                            if (response.trim() == "") {
                                response = '{"message":"Give the valid data only ."}';
                            }
                            resolve({
                                responseStatus: this.status,
                                obj: JSON.parse(response)
                            });
                        } else if (this.status === 401 && this.readyState === 4) {
                            var response = this.response ? this.response : this.responseText;
                            if (response.trim() == "") {
                                response = '{"message":"You are not authenticated to perfom this operation."}';
                            }
                            resolve({
                                responseStatus: this.status,
                                obj: JSON.parse(response)
                            });
                        } else if (this.status === 403 && this.readyState === 4) {
                            var response = this.response ? this.response : this.responseText;
                            resolve({
                                responseStatus: this.status,
                                obj: JSON.parse(response)
                            });
                        } else if (this.status === 413 && this.readyState === 4) {
                            var response = this.response ? this.response : this.responseText;
                            var res = JSON.parse(response);
                            if (response.trim() == "") {
                                response = '{"message":"Your countent is too large ."}';
                            }
                            resolve({
                                responseStatus: this.status,
                                obj: res
                            });
                        } else if (this.status === 422 && this.readyState === 4) {
                            var response = this.response ? this.response : this.responseText;
                            var res = JSON.parse(response);
                            res.message = res.errorMessage ;
                            resolve({
                                responseStatus: this.status,
                                obj: res
                            });
                        } else if (this.status === 500 && this.readyState === 4) {
                            var response = this.response ? this.response : this.responseText;
                            resolve({
                                responseStatus: this.status,
                                obj: JSON.parse(response)
                            });
                        } else if(this.status === 502 && this.readyState === 4){
                            resolve({
                                responseStatus: this.status,
                                obj: '{"message":"We will be right back!Our service is temporarily unavailable. We are currently working to restore it.Please try again after sometime."}'
                            });
                        } else {
                            reject(this);
                        }
                    };
                    client.onerror = function(e) {
                        reject(this);
                    };


                });
            }
        };

        return {
            'get': function() {
                return core.ajax('GET', url);
            },
            'post': function(args, payload, headers) {
                return core.ajax('POST', url, args, payload);
            },
            'put': function(args, payload, headers) {
                return core.ajax('PUT', url, args, payload);
            },
            'del': function() {
                return core.ajax('DELETE', url);
            },
            'attach': function(files, onProcess) {
                return core.ajax('POST', url, {}, undefined, files);
            },
            'patch': function(args, payload, headers) {
                return core.ajax('PATCH', url, args, payload);
            }
        };
    };
}