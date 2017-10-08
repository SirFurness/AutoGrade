window.addEventListener ("load", waitForIframe, false);

function waitForIframe(evt) {
    document.getElementById('mybbCanvas').addEventListener("load", function() {
	document.getElementById('mybbCanvas').contentWindow.document.getElementById('right_stream_mygrades').addEventListener("load", main)
    })
}

function main() {
    var inside = document.getElementById("mybbCanvas").contentWindow.document
    var left_stream = inside.getElementById("left_stream_mygrades")
    var right_stream = inside.getElementById("right_stream_mygrades")

    var br = document.createElement("br")
    left_stream.appendChild(br)
    
    var grades = getGrades();
    console.log(grades.received)
    console.log(grades.possible)
    var grade = grades.received/grades.possible;
    grade = Math.ceil(grade*10000)/100;
    var percent = grade+"%";

    insertGrade(percent)
}

function insertGrade(percent) {
    var inside = document.getElementById("mybbCanvas").contentWindow.document
    var left_stream = inside.getElementById("left_stream_mygrades")
    var right_stream = inside.getElementById("right_stream_mygrades")
    var inside_right = right_stream.contentWindow.document

    var gradeBox = document.createElement("div")
    gradeBox.className = "stream_item active_stream_item"

    var gradeWrapper = document.createElement("div")
    gradeWrapper.className = "grade-value-wrapper u_floatThis-left"

    var gradeValue = document.createElement("div")
    gradeValue.className = "grade-value"
    gradeValue.innerHTML = percent

    var streamContext = document.createElement("div")
    streamContext.className = "stream_context"
    streamContext.innerHTML = "Current Percent Grade"

    gradeWrapper.appendChild(gradeValue)
    gradeBox.appendChild(gradeWrapper)
    gradeBox.appendChild(streamContext)
    left_stream.appendChild(gradeBox)
    
}

function getGrades() {
    var inside = document.getElementById("mybbCanvas").contentWindow.document
    var left_stream = inside.getElementById("left_stream_mygrades")
    var right_stream = inside.getElementById("right_stream_mygrades")
    var inside_right = right_stream.contentWindow.document

    var grades = inside_right.getElementsByClassName("cell grade")

    var totalGrade = 0;
    var totalPossible = 0;
    
    for(i = 0; i < grades.length; i++) {
	var elem = grades[i];
	if(elem.childNodes.length !== 4) {
	    continue;
	} else if(elem.childNodes[1].innerText === "-") {
	    break;
	}
	var grade = parseFloat(elem.childNodes[1].innerText);
	var total = parseFloat(elem.childNodes[2].innerText.slice(1))
	if(grade > total) {
	    grade = total;
	}

	totalGrade += grade;
	totalPossible += total;
    }

    return {received: totalGrade, possible: totalPossible}
}
