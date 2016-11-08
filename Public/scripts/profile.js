function updateTeacherList(Array){
    var input = document.getElementById("studentInput").value;
    jQuery('#teacherList').html('');
    for(i=0; i< Array.length; i++){
//    console.log(i);
        if(Array[i].includes(input)){
            $('#teacherList').append("<form action='/changeTeacher' method='post'>                <input name='teacher' value='"+Array[i]+"' readonly/><input type='submit'  value='Choose Teacher'/> </form>");
        }
    }
}