    var active = false;
    var position = {"0": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0},
                    "1": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0},
                    "2": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0},
                    "3": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0},
                    "4": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0},
                    "5": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0},
                    "6": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0},
                    "7": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0},
                    "8": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0},
                    "9": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0},
                    "10": {currentX: 0, currentY: 0, initialX: 0, initialY: 0, xOffset: 0, yOffset: 0}};
    //var position = {};


    function getParent(el) {
        var Parent = el.parentNode;
        if (Parent.className !== "mouveble") {
            temp = getParent(Parent);
        }
        else {
            temp = Parent;
        }
        return temp;
    }

    function dragStart(e) {
        var postit = getParent(e.target);
        var o = position[postit.id];
        postit.style.zindex = 999;

        o.initialX = e.clientX - o.xOffset;
        o.initialY = e.clientY - o.yOffset;

        active = true;
    }

    function dragEnd(e) {
        var postit = getParent(e.target);
        postit.style.zindex = 1;
        active = false;
    }

    function drag(e) {
        var postit = getParent(e.target);
        var o = position[postit.id];
        if (active) {
            e.preventDefault();

            o.xOffset = o.currentX = e.clientX - o.initialX;
            o.yOffset = o.currentY = e.clientY - o.initialY;

            setTranslate(o.currentX, o.currentY, postit);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
    }