


var iframe= document.getElementById('xbox');
var idoc= iframe.contentDocument || iframe.contentWindow.document; // ie compatibility

function makeEditableAndHighlight(colour) {

    var range, sel = idoc.getSelection();
    if (sel.rangeCount && sel.getRangeAt) {
        range = sel.getRangeAt(0);
    }
    idoc.designMode = "on";
    if (range) {
        sel.removeAllRanges();
        sel.addRange(range);
    }
    console.log(range);
    // Use HiliteColor since some browsers apply BackColor to the whole block
    if (!idoc.execCommand("HiliteColor", false, colour)) {
        idoc.execCommand("BackColor", false, colour);
    }
    idoc.designMode = "off";
}

function highlightMe() {
    var range;
    var colour = '#ff5';
    if (idoc.getSelection) {
        // IE9 and non-IE
        try {
            if (!idoc.execCommand("BackColor", false, colour)) {
                makeEditableAndHighlight(colour);
            }
        } catch (ex) {
            makeEditableAndHighlight(colour)
        }
    } else if (idoc.selection && idoc.selection.createRange) {
        // IE <= 8 case
        range = idoc.selection.createRange();
        console.log(range);
        range.execCommand("BackColor", false, colour);
    }
}




function getMeHi()
{
     iframe= document.getElementById('xbox');
     idoc= iframe.contentDocument || iframe.contentWindow.document; // ie compatibility
     highlightMe();

}