[![license](https://img.shields.io/github/license/mashape/apistatus.svg)](https://opensource.org/licenses/MIT)

# mural_interview_app

Coding challenge made for mural and at the same time my first steps with React Native.

## Table of Contents
  * [Usage](#usage)
  * [Installation](#installation)
  * [Motivation](#motivation)
  * [Search](#search)
  * [Output](#output)
  * [Testing](#testing)

## Usage


## Installation
```sh
TODO
```

## Requirements & Implementation

1. **The canvas needs to be scrollable & zoomable**: This is easily achieved by using a `ScrollView` with the property `directionalLockEnabled = false`. For this, the canvas was designed as a different component which basically contains the `ScrollView`.
2. **Double tap over canvas create a new Image Widget**: For implementing this, the component `DoubleTouchListener` was created, which basically executes a callback passed via the props when it detects a double touch.
3. **Widgets should be movable**: This was maybe the most difficult part. Using some inspiration (https://blog.reactnativecoach.com/creating-draggable-component-with-react-native-132d30c27cb0), a Draggable component was implemented which basically allows to drag the widget around the screen. This component abstract the logic of a `PanResponder` which needs to detect when the user is dragging, and react accordingly.
4. **Tap over a widget sets it as selected & shows a tooltip with a delete button**: An external library was used for implementing this behaviour. First, `react-native-tooltip` was considered (as it was suggested). The problem was that I couldn't install it following the instructions in https://github.com/chirag04/react-native-tooltip. It may be because of the version of RN used in this project. Because of this, I used other library https://github.com/wookoinc/react-native-popover-tooltip which offers similar functionality. This component that abstract the logic of selection (and displaying a tooltip) is called `Selectable`.

The idea was to implement this project in a decoupled way, to be able to reason about the code better. `Draggable` and `Selectable` are inspired by native iOS development (`Swift`), in which this behaviour is abstracted via protocols that describe capabilities. In native development, this protocols would be implemented by `UIView`. The advantage of decoupling the behaviour in this ways is that they can be chained (which is in fact used in this project), so if there is a need to implement a new component which can be dragged (highly probable, as it is a canvas) or selectable, `Draggable` and `Selectable` can be directly reused.

## Pain points
This was the first time I tried React Native. The first approaches were (as usual) looking through internet to see related projects. The main issues I found while developing this small project were:

1. Handling of touch events: According to my research, there are basically x different alternatives for handling touches:
    1. The component supports it natively (i.e.: `ScrollView`, `Button`). Callbacks are passed to handle the `onPress` (and related) methods.
    2. Using `Touchable` components, which behaves similar to the case described before.
    3. Implementing the methods in a `View` of the gesture responder system (https://facebook.github.io/react-native/docs/gesture-responder-system.html)
    4. Using `PanResponder`, which is an abstraction over the gesture responder system that `"reconciles several touches into a single gesture. It makes single-touch gestures resilient to extra touches, and can be used to recognize simple multi-touch gestures."`

    Coming from the native side of iOS development, Apple understanded that using the previous touch handling mechanisms produces a lot of problems (the so called capturing and bubbling). A nice lightning talk that explains this is given by a former Apple's lead developer, Andy Matuschak: https://www.youtube.com/watch?v=uBYPqb83C7k ("It has a touch api that was very much like the dumbs API: Capturing and bubbling. And it completely broke down as we tried to build fancy multi-touch interfaces"). In this project, I had the problem that the gestures of the different components: scrolling, double tap, dragging a widget and selecting a widget were interfering with each other. This makes it difficult to add a new gesture-based component. 

    In the native side, we have the gestures recognizer: https://developer.apple.com/documentation/uikit/uigesturerecognizer. This makes it simpler to implement gesture handling in native side.

2. The `<Image>` component of the `<ImageWidget>` supplied to the tooltip library instantiates a new image every time, so it produces a bug that when the popover is shown, the image is queried again. In this particular case, as the image is downloaded from lorempixel, a new different image is downloaded. This was not fixed as it would require to download the image via other way and cache it on the device, which is a difficult thing in react native (for example: https://stackoverflow.com/questions/44506733/react-native-lrucache-does-it-cache-images-from-image-urls). 


## Redux
Redux could be used, but I didn't choose to use it here yet, simply because of a matter of time (getting into RN and making this project took one week, with a surgery I had to take in the middle).
