import { useState, useEffect, createRef } from 'react';

// this function works as our way to control the animation speed
function getNextTransition(width, index, translate, direction, setTranslate) {
  setTimeout(function() {
    setTranslate(direction === 'next' ? translate + 100 : translate - 100);
  }, 75);
}

export default function useTransition(children) {
  const len = children.length;
  // declare state variables
  const [windowSize, setWindowSize] = useState({width: 0, height: 0,});
  const [index, setIndex] = useState(1);
  const [width, setWidth] = useState(0)
  const [translate, setTranslate] = useState(windowSize.width);
  const [action, setAction] = useState({ lastAction: '', currentAction: '' });
  const [items, setItems] = useState([ children[len - 1], ...children ]);
    const setNextAction = (currentAction) => {
      setAction({
        lastAction: action.currentAction,
        currentAction,
      });
    }
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.outerWidth,
        height: window.outerHeight
      });

      var _width = 0;
      switch(true) {
        case window.outerWidth > 1500:
          _width = 1000;
          break;
        case window.outerWidth > 1199:
          _width = 500;
          break;
        case window.outerWidth > 990:
          _width = 300;
          break;
        case window.outerWidth > 767:
          _width = 100;
          break;
        default:
          _width = 50;
          break;
      }
      
      setWidth(_width);
      setTranslate(windowSize.width);
    }
    window.addEventListener("resize", handleResize);

    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // this effect hook will be triggered every time the "translate variable will change"
  useEffect(() => {
    // if the transition has not completed, continue with transition
    if ((translate < (index + 1) * width && action.currentAction === 'next') || (translate > (index - 1) * width && action.currentAction === 'prev')) {
      getNextTransition(
        width,
        index,
        translate,
        action.currentAction,
        setTranslate,
      );
    } else if (action.currentAction !== '') {
      // otherwise set the next action to be ''
      setNextAction('');
    }
  }, [translate]);

  // this effect hook will be triggered every time the action object changes.
  useEffect(() => {
    // if we click next when we are at the end of our carousel.
    if (action.currentAction === 'next' && index + 1 > len) {
      // add the first item to the end of the array
      setItems([ children[len - 1], ...children, children[0]]);
      // start transition
      setTranslate(translate + 1);
    
      // if we clicked next
    } else if (action.currentAction === 'next') {
      // start transition
      setTranslate(translate + 1);
    
      // if we clicked prev
    } else if (action.currentAction === 'prev') {
      // start transition
      setTranslate(translate - 1);
    
    // if we have gone past the last item (and onto the extra one)
    } else if (index + 1 > len && action.lastAction === 'next') {
      // reset items to initial state
      setItems([ children[len - 1], ...children ]);
      // set translate to the 1 index of the array
      setTranslate(width);
      // and set the current index to one.
      setIndex(1);

    // if we reached the first (duplicate) item in the array and want to go back
    } else if (index - 1 === 0 && action.lastAction === 'prev') {
      // set index to last item in array
      setIndex(len);
      // set translate to last item in array
      setTranslate(len * width);
    
    // if transition next happened
    } else if (action.lastAction === 'next') {
      // update index
      setIndex(index + 1);

    // if transition prev happened
    } else if (action.lastAction === 'prev') {
      // update index
      setIndex(index - 1);
    }
  }, [action]);

  // return all variables to be used with the hook.
  return {
    index,
    translate,
    setIndex,
    setTranslate,
    width,
    items,
    setAction: setNextAction,
  };
}
