import $ from "jquery";
const URL = "http://localhost:8081/";

export const RequestUtils = {

    makeRequest(path, type, data, complete, success, error){

        $.ajax({
            url: URL + path,
            data: data,
            type: type,
            dataType: "json", // expected format for response
            processData: false,
            cache: false,
            timeout: 600000,
            contentType: 'application/json',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            complete: function () {
            },
            success: success,
            error: function (jqXHR, textStatus, error) {
                console.error(jqXHR);
                console.error(textStatus);
            }
        });
    },
};

export default RequestUtils;