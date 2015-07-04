


// iframe= document.getElementById('xbox');
// idoc= iframe.contentDocument || iframe.contentWindow.document; // ie compatibility

var qq;

var zss_editor = {};

// The current selection
zss_editor.currentSelection;

zss_editor.backuprange = function(){
    var selection = idoc.getSelection();
    var range = selection.getRangeAt(0);
    zss_editor.currentSelection = {"startContainer": range.startContainer, "startOffset":range.startOffset,"endContainer":range.endContainer, "endOffset":range.endOffset};
    console.log( zss_editor.currentSelection );
    qq = range.startContainer; 
    return  {"startContainer":getXPath(range.startContainer), "startOffset":range.startOffset,"endContainer":getXPath(range.endContainer), "endOffset":range.endOffset}; ;
}

zss_editor.restorerange = function(){
    var selection = idoc.getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    range.setStart(zss_editor.currentSelection.startContainer, zss_editor.currentSelection.startOffset);
    range.setEnd(zss_editor.currentSelection.endContainer, zss_editor.currentSelection.endOffset);
    selection.addRange(range);
    console.log(range);
    return range;
}

zss_editor.setTextColor = function(color) {
    zss_editor.restorerange();
    idoc.execCommand("styleWithCSS", null, true);
    idoc.execCommand('foreColor', false, color);
    idoc.execCommand("styleWithCSS", null, false);
}

zss_editor.setBackgroundColor = function(color) {
    idoc.designMode = "on";
    zss_editor.restorerange();
    idoc.execCommand("styleWithCSS", null, true);
    idoc.execCommand('hiliteColor', false, color);
    idoc.execCommand("styleWithCSS", null, false);
}




function getHighlited()
{
    return zss_editor.backuprange();
}

function setHighlight(range , color)
{
    zss_editor.currentSelection =  deXpathify(range);
    zss_editor.setBackgroundColor(color);
}

function deXpathify(range)
{
    range.startContainer = getElementByXpath(range.startContainer);
    range.endContainer = getElementByXpath(range.endContainer);
}

function getElementByXpath(path) {
  return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}

function getXPath(node) {
    var comp, comps = [];
    var parent = null;
    var xpath = '';
    var getPos = function(node) {
        var position = 1, curNode;
        if (node.nodeType == Node.ATTRIBUTE_NODE) {
            return null;
        }
        for (curNode = node.previousSibling; curNode; curNode = curNode.previousSibling) {
            if (curNode.nodeName == node.nodeName) {
                ++position;
            }
        }
        return position;
     }

    if (node instanceof Document) {
        return '/';
    }

    for (; node && !(node instanceof Document); node = node.nodeType == Node.ATTRIBUTE_NODE ? node.ownerElement : node.parentNode) {
        comp = comps[comps.length] = {};
        switch (node.nodeType) {
            case Node.TEXT_NODE:
                comp.name = 'text()';
                break;
            case Node.ATTRIBUTE_NODE:
                comp.name = '@' + node.nodeName;
                break;
            case Node.PROCESSING_INSTRUCTION_NODE:
                comp.name = 'processing-instruction()';
                break;
            case Node.COMMENT_NODE:
                comp.name = 'comment()';
                break;
            case Node.ELEMENT_NODE:
                comp.name = node.nodeName;
                break;
        }
        comp.position = getPos(node);
    }

    for (var i = comps.length - 1; i >= 0; i--) {
        comp = comps[i];
        xpath += '/' + comp.name;
        if (comp.position != null) {
            xpath += '[' + comp.position + ']';
        }
    }

    return xpath;

}
function getXPath(node) {
    var comp, comps = [];
    var parent = null;
    var xpath = '';
    var getPos = function(node) {
        var position = 1, curNode;
        if (node.nodeType == Node.ATTRIBUTE_NODE) {
            return null;
        }
        for (curNode = node.previousSibling; curNode; curNode = curNode.previousSibling) {
            if (curNode.nodeName == node.nodeName) {
                ++position;
            }
        }
        return position;
     }

    if (node instanceof Document) {
        return '/';
    }

    for (; node && !(node instanceof Document); node = node.nodeType == Node.ATTRIBUTE_NODE ? node.ownerElement : node.parentNode) {
        comp = comps[comps.length] = {};
        switch (node.nodeType) {
            case Node.TEXT_NODE:
                comp.name = 'text()';
                break;
            case Node.ATTRIBUTE_NODE:
                comp.name = '@' + node.nodeName;
                break;
            case Node.PROCESSING_INSTRUCTION_NODE:
                comp.name = 'processing-instruction()';
                break;
            case Node.COMMENT_NODE:
                comp.name = 'comment()';
                break;
            case Node.ELEMENT_NODE:
                comp.name = node.nodeName;
                break;
        }
        comp.position = getPos(node);
    }

    for (var i = comps.length - 1; i >= 0; i--) {
        comp = comps[i];
        xpath += '/' + comp.name;
        if (comp.position != null) {
            xpath += '[' + comp.position + ']';
        }
    }

    return xpath;

}


// setHighlight(getHighlited() , '#000')