var body = document.querySelector("body");
var bre = document.querySelectorAll(".genInput")[4];
var eachP; var staTime; var minSub = 0; var maxSub;
var tableArr = []; var subData; var chk = 0; var breArr = []; bArr = [];
/* Here you make a request to the server to get your data in json format using ajax or any
   Server data retrieving method or technology like fetch API, server send events or websocket   */

/* This section will ve commented out if data is retrieved from the database or server.
Begin your comment here.                                                                */   
   var myJ = {
    "data": [{ "subject": "Mathematics", "unit": 5 }, { "subject": "English", "unit": 5 },
    { "subject": "Physics", "unit": 5 }, { "subject": "Chemistry", "unit": 5 },
    { "subject": "Agriculture", "unit": 4 }, { "subject": "Commerce", "unit": 3 },
    { "subject": "Computer", "unit": 4 }, { "subject": "Biology", "unit": 5 },
    { "subject": "Literature", "unit": 3 }, { "subject": "Marketing", "unit": 3 },
    { "subject": "Government", "unit": 3 }, { "subject": "C.R.S", "unit": 3 },
    { "subject": "Economics", "unit": 4 }, { "subject": "Civic", "unit": 3 }

    ]
};

/* where to end the comment section if data is retrieved for the server */


var tableDays = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY", "SUNDAY"];

body.onload = function () {
    emptyInp();
}

function getRnd(min, max) {
    min = minSub;
    max = maxSub;
    dat = Math.floor(Math.random() * (max - min + 1)) + min;
    var arrLen = subData.data.length;
    for (L = 0; L < arrLen; L++) {
        datCom = tableArr[L];
        if (dat == datCom) {
            chk = -1;
            break;
        }
    }
    if (chk == -1) {
        chk = 0;
        getRnd();

    }
    else {
        return dat;
    }

    return dat;

}

function emptyInp() {
    var inp = document.querySelectorAll("input");
    var j;
    for (j = 0; j < inp.length; j++) {
        inp[j].value = "";
    }
}

bre.onchange = function () {
    showBre();
}

function showBre() {
    var bValue = document.querySelectorAll(".genInput")[4].value;
    var i;
    var k;
    var bValue2 = 3;
    for (k = 0; k < bValue2; k++) {
        document.querySelectorAll(".bre")[k].style.display = "none";
    }
    for (i = 0; i < bValue; i++) {
        document.querySelectorAll(".bre")[i].style.display = "block";
    }


}

function chkInp(inp1, inp2, inp3, inp4) {
    if (inp1 === undefined || inp1 == null) {
        return -1;
    }
    if (inp2 === undefined || inp2 == null || inp2 == 0) {
        return -1;
    }
    if (inp3 === undefined || inp3 == null || inp3 == 0) {
        return -1;
    }
    if (inp4 === undefined || inp4 == null || inp4 == 0) {
        return -1;
    }
}

function valBre(perMax) {
    var breLen2 = document.querySelectorAll(".breInput").length;
    var k;
    //alert(typeof(perMax))
    for (k = 0; k < breLen2; k++) {
        var breVal2 = document.querySelectorAll(".breInput")[k].value;
        if (breVal2 > perMax) {
            return -1;
        }
    }
}

/* Here you pass the data retrieve in json format to this function*/
function genTable(res) {
    var tabRowLen = document.querySelectorAll(".genInput")[2].value;
    var addRowLen = document.querySelectorAll(".genInput")[4].value;
    var tabColLen = document.querySelectorAll(".genInput")[3].value;
    var tabStaTime = document.querySelectorAll(".genInput")[0].value;
    var tabEachP = document.querySelectorAll(".genInput")[1].value;
    var inpVal = chkInp(tabStaTime, tabEachP, tabRowLen, tabColLen);
    if (inpVal == -1) {
        emptyInp();
        showBre();
        closeDiv5();
        alert("please fill the parameters correctly");
        return false;
    }
    var maxPeriod = valBre(Number(tabRowLen));
    if (maxPeriod == -1) {
        emptyInp();
        showBre();
        closeDiv5();
        alert("Break period is invalid");
        return false;
    }
    eachP = tabEachP.toString();
    staTime = tabStaTime.toString();
    var newRowLen;
    /* This section is where the data is passed to the genTable function */
    res = myJ; // comment res = myJ and replace it with res = (data retrieved);
    // Remember to convert the json data to javascript object before using it here;
    
    var L;
    subData = myJ; //comment subData = myJ and replace it with subData = (variable retrieved)
      // Remember to convert the json data to javascript object before using it here;
    /*  The section ends here */

    tabColLen++;
    if (addRowLen === undefined || addRowLen == null || addRowLen == 0) {
        newRowLen = tabRowLen;
    }
    else {
        newRowLen = Number(Number(addRowLen) + Number(tabRowLen));
    }
    var sLen = res.data.length;
    for (L = 0; L < sLen; L++) {
        tableArr[L] = -100;
    }
    //alert(tabColLen);
    var timeTable = creTable(newRowLen, tabColLen, res);
    var loc = document.querySelector(".location");
    loc.innerHTML = timeTable.innerHTML;
    emptyInp();
    showBre();
    closeDiv5();

    function creTable(row, col, subs) {
        subLen = subs.data.length;
        maxSub = subLen - 1;
        //alert(subLen); 
        row = Number(row);
        col = Number(col);
        var bLen = document.querySelectorAll(".genInput")[4].value;
        var p;
        var q;
        var val;
        //alert(bLen);

        for (p = 0; p < bLen; p++) {
            bArr[p] = -100;
            breArr[p] = -100;
        }
        for (q = 0, val = 0; q < bLen; q++) {

            var bPeriod = document.querySelectorAll(".breInput")[q].value;
            if (bPeriod === undefined || bPeriod == null || bPeriod == 0) {
                bPeriod = -100;
            }
            else {
                bPeriod = Number(bPeriod) + val;
            }
            breArr[q] = bPeriod;
            var bMin = document.querySelectorAll(".bInput")[q].value;
            if (bMin === undefined || bMin == null || bMin == 0) {
                bMin = -100;
            }
            bArr[q] = bMin;
            val++;
        }
        var tableCon = document.createElement("div");
        var bigTable = document.createElement("table");
        var tabBody = document.createElement("tbody");
        var i;
        var k;
        var n;
        var m;
        var t;
        var t2;
        var tRowArr = [];

        var headRow = document.createElement("tr");
        var firstHead = document.createElement("th");
        firstHead.setAttribute("contenteditable", "false");
        var firstTxt = document.createTextNode("DAYS");
        firstHead.appendChild(firstTxt);
        var hr = document.createElement("hr");
        hr.setAttribute("class", "headHr");
        firstHead.appendChild(hr);
        var firstTxt2 = document.createTextNode("TIME");
        firstHead.appendChild(firstTxt2);
        headRow.appendChild(firstHead);
        for (m = 0; m < col - 1; m++) {
            var headData = document.createElement("th");
            headData.setAttribute("contenteditable", "false")
            var headTxt = document.createTextNode(tableDays[m])
            headData.appendChild(headTxt);
            headRow.appendChild(headData);
        }
        tabBody.appendChild(headRow);

        for (k = 0; k < row; k++) {
            tRowArr[k] = document.createElement("tr");
        }

        for (t = 0, t2 = 0; t < row; t++) {
            t2++;
            var timeCol = document.createElement("td");
            timeCol.setAttribute("contenteditable", "true");
            var timeDat = getTime(t2);
            var txt = document.createTextNode(timeDat.split("]]")[0] + " " + " - " + " " + timeDat.split("]]")[1]);
            timeCol.setAttribute("class", "tBold");
            timeCol.appendChild(txt);
            tRowArr[t].appendChild(timeCol);

        }


        for (i = 0; i < col - 1; i++) {
            var j;
            for (j = 0; j < row; j++) {
                if (j == Number(breArr[0]) || j == Number(breArr[1]) || j == Number(breArr[2])) {
                    if (i == 0) {
                        var colData = document.createElement("td");
                        colData.setAttribute("class", "tBold2");
                        colData.colSpan = col;
                        var breTxt = document.createTextNode("B  R  E  A  K");
                        colData.appendChild(breTxt);
                        tRowArr[j].appendChild(colData);
                    }
                    else {
                        continue;
                    }
                }
                else {
                    var colData = document.createElement("td");
                    var subIndex = getRnd();
                    tableArr[j] = subIndex;
                    var txt = document.createTextNode(subData.data[subIndex].subject);
                    colData.appendChild(txt);
                    tRowArr[j].appendChild(colData);
                }

            }

            var k;
            var Len = subData.data.length - 1;
            for (k = 0; k < Len; k++) {
                tableArr[k] = -100;
            }

        }

        for (n = 0; n < row; n++) {
            tabBody.appendChild(tRowArr[n]);
        }
        bigTable.appendChild(tabBody);
        bigTable.setAttribute("border", "2");
        tableCon.appendChild(bigTable);
        return tableCon;


    }

    function getTime(ind) {
        var myTime = staTime;
        var eP = Number(eachP);
        var m;
        var staMin = myTime.split(":")[1].toString();
        var staHour = myTime.split(":")[0].toString();
        var initMin = Number(staMin);
        var initHour = Number(staHour);
        var min; var hour; var min2; var hour2; var min3; var hour3;
        var time1; var time2; var newMin;
        //alert(typeof(initMin)+" "+typeof(+initHour))
        for (m = 0; m < ind; m++) {
            if (m == 0) {
                min = initMin;
                hour = initHour;
                newMin = min;
                if (min < 10) {
                    newMin = "0" + min;
                }
                time1 = hour + ":" + newMin;
                min2 = min + eP;
                hour2 = hour;
                if (min2 >= 60) {
                    min2 = min2 - 60;
                    hour2++;
                    if (min2 >= 60) {
                        min2 = min2 - 60;
                        hour2++;
                        if (min2 >= 60) {
                            min2 = min2 + 60;
                            hour2++;
                        }
                    }
                }
                if (hour2 > 12) {
                    hour2 = hour2 - 12;
                }
                newMin = min2;
                if (min2 < 10) {
                    newMin = "0" + min2;
                }
                time2 = hour2 + ":" + newMin;
                min3 = min2;
                hour3 = hour2;
            }
            else {
                newMin = min3;
                if (min3 < 10) {
                    newMin = "0" + min3;
                }
                time1 = hour3 + ":" + newMin;

                if (m == Number(breArr[0])) {
                    min3 = min3 + Number(bArr[0])
                }
                else if (m == Number(breArr[1])) {
                    min3 = min3 + Number(bArr[1])
                }
                else if (m == Number(breArr[2])) {
                    min3 = min3 + Number(bArr[2])
                }
                else {
                    min3 = min3 + eP;
                }
                if (min3 >= 60) {
                    min3 = min3 - 60;
                    hour3++;
                    if (min3 >= 60) {
                        min3 = min3 - 60;
                        hour3++;
                        if (min3 >= 60) {
                            min3 = min3 + 60;
                            hour3++;
                        }
                    }
                }
                if (hour3 > 12) {
                    hour3 = hour3 - 12;
                }
                newMin = min3;
                if (min3 < 10) {
                    newMin = "0" + min3;
                }
                time2 = hour3 + ":" + newMin;


            }

        }
        return time1.toString() + "]]" + time2.toString();

    }

}


/* For modal */
var modal5 = document.querySelector(".modal5");
var modalContent5 = document.querySelectorAll(".modal-content5");
function closeDiv5() {
    modal5.style.display = "none";
    for (var i = 0; i < modalContent5.length; i++) {
        modalContent5[i].style.display = "none";
    }
}
try {
    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    // When the user clicks the button, open the modal 
    btn.onclick = function (div) {
        modal5.style.display = "block";
        for (var i = 0; i < modalContent5.length; i++) {
            modalContent5[i].style.display = "none";
        }
        document.querySelector(div).style.display = "block";
        return false;
    }
}
catch (ex) { }

// When the user clicks on <span> (x), close the modal
function closeSpan5() {
    modal5.style.display = "none";
    for (var i = 0; i < modalContent5.length; i++) {
        modalContent5[i].style.display = "none";
    }
}
function showModal5(div) {
    modal5.style.display = "block";
    for (var i = 0; i < modalContent5.length; i++) {
        modalContent5[i].style.display = "none";
    }
    document.querySelector(div).style.display = "block";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal5) {
        modal5.style.display = "none";
        for (var i = 0; i < modalContent5.length; i++) {
            modalContent5[i].style.display = "none";
        }
        document.querySelector(div).style.display = "block";
    }
}

