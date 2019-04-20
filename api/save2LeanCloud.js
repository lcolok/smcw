function thisFunc(request) {
    var dic = request.params;
    var extendedClass = AV.Object.extend(dic.chosenClass);
    var file = new extendedClass();
    for (var i in dic) {
        file.set(i, dic[i]);
    }
    file.save().then(function () {
        console.log("已上传到LeanCloud");
    }, function (error) {
        console.log(JSON.stringify(error));
    });
    return
};