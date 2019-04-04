/******/ ;(function(modules) {
    // webpackBootstrap
    /******/ // The module cache
    /******/ var installedModules = {} // The require function
    /******/
    /******/ /******/ function __webpack_require__(moduleId) {
        /******/
        /******/ // Check if module is in cache
        /******/ if (installedModules[moduleId]) {
            /******/ return installedModules[moduleId].exports
            /******/
        } // Create a new module (and put it into the cache)
        /******/ /******/ var module = (installedModules[moduleId] = {
            /******/ i: moduleId,
            /******/ l: false,
            /******/ exports: {}
            /******/
        }) // Execute the module function
        /******/
        /******/ /******/ modules[moduleId].call(
            module.exports,
            module,
            module.exports,
            __webpack_require__
        ) // Flag the module as loaded
        /******/
        /******/ /******/ module.l = true // Return the exports of the module
        /******/
        /******/ /******/ return module.exports
        /******/
    } // expose the modules object (__webpack_modules__)
    /******/
    /******/
    /******/ /******/ __webpack_require__.m = modules // expose the module cache
    /******/
    /******/ /******/ __webpack_require__.c = installedModules // define getter function for harmony exports
    /******/
    /******/ /******/ __webpack_require__.d = function(exports, name, getter) {
        /******/ if (!__webpack_require__.o(exports, name)) {
            /******/ Object.defineProperty(exports, name, {
                /******/ configurable: false,
                /******/ enumerable: true,
                /******/ get: getter
                /******/
            })
            /******/
        }
        /******/
    } // getDefaultExport function for compatibility with non-harmony modules
    /******/
    /******/ /******/ __webpack_require__.n = function(module) {
        /******/ var getter =
            module && module.__esModule
                ? /******/ function getDefault() {
                      return module['default']
                  }
                : /******/ function getModuleExports() {
                      return module
                  }
        /******/ __webpack_require__.d(getter, 'a', getter)
        /******/ return getter
        /******/
    } // Object.prototype.hasOwnProperty.call
    /******/
    /******/ /******/ __webpack_require__.o = function(object, property) {
        return Object.prototype.hasOwnProperty.call(object, property)
    } // __webpack_public_path__
    /******/
    /******/ /******/ __webpack_require__.p = '' // Load entry module and return exports
    /******/
    /******/ /******/ return __webpack_require__((__webpack_require__.s = 0))
    /******/
})(
    /************************************************************************/
    /******/ [
        /* 0 */
        /***/ function(module, exports, __webpack_require__) {
            __webpack_require__(1)
            module.exports = __webpack_require__(6)

            /***/
        },
        /* 1 */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
            'use strict'
            Object.defineProperty(__webpack_exports__, '__esModule', {
                value: true
            })
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_builder__ = __webpack_require__(
                2
            )

            // Example block
            // buildBlock({
            //     name: 'Title and Image',
            //     slug: 'title-and-image',
            //     description: 'A title and an image.',
            //     class: 'title-and-image',
            //     content: [
            //         <h2>Title</h2>,
            //         { name: 'content', type: 'text' },
            //         <h2>Image</h2>,
            //         { name: 'image', type: 'image' }
            //     ]
            // })

            /***/
        },
        /* 2 */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
            'use strict'
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__prebuilt__ = __webpack_require__(
                3
            )
            var _extends =
                Object.assign ||
                function(target) {
                    for (var i = 1; i < arguments.length; i++) {
                        var source = arguments[i]
                        for (var key in source) {
                            if (
                                Object.prototype.hasOwnProperty.call(
                                    source,
                                    key
                                )
                            ) {
                                target[key] = source[key]
                            }
                        }
                    }
                    return target
                }

            // prep prebuilt components

            var registerBlockType = wp.blocks.registerBlockType
            var RichText = wp.editor.RichText

            /* unused harmony default export */ var _unused_webpack_default_export = function() {
                var opts =
                    arguments.length > 0 && arguments[0] !== undefined
                        ? arguments[0]
                        : {}

                var settings = _extends(
                    {
                        // defaults
                        slug: 'block-slug',
                        name: 'Example',
                        description: '',
                        icon: 'format-gallery',
                        content: [],
                        class: 'block-class'
                    },
                    opts
                )

                // build attributes according to content children
                var attributes = {}
                settings.content.map(function(child) {
                    if (
                        child.type &&
                        __WEBPACK_IMPORTED_MODULE_0__prebuilt__[
                            'a' /* default */
                        ][child.type]
                    ) {
                        attributes[
                            child.name
                        ] = __WEBPACK_IMPORTED_MODULE_0__prebuilt__[
                            'a' /* default */
                        ][child.type].attributes(child)
                    }
                })

                // register desired block
                registerBlockType('custom-fh/' + settings.slug, {
                    title: settings.name,
                    description: settings.description,
                    icon: settings.icon,
                    category: 'custom-fh',

                    // use attributes defined above
                    attributes: attributes,

                    // Editor
                    edit: function edit(props) {
                        var attributes = props.attributes,
                            className = props.className,
                            setAttributes = props.setAttributes

                        var classes = settings.class + ' fh-custom-block'

                        var output = settings.content
                            .map(function(child) {
                                if (
                                    child.type &&
                                    __WEBPACK_IMPORTED_MODULE_0__prebuilt__[
                                        'a' /* default */
                                    ][child.type]
                                ) {
                                    return __WEBPACK_IMPORTED_MODULE_0__prebuilt__[
                                        'a' /* default */
                                    ][child.type].edit(props, child)
                                }

                                return child
                            })
                            .filter(function(x) {
                                return x
                            })

                        return wp.element.createElement(
                            'div',
                            { className: classes },
                            output
                        )
                    },

                    // On save
                    save: function save(props) {
                        var output = settings.content
                            .map(function(child) {
                                if (
                                    child.type &&
                                    __WEBPACK_IMPORTED_MODULE_0__prebuilt__[
                                        'a' /* default */
                                    ][child.type]
                                ) {
                                    return __WEBPACK_IMPORTED_MODULE_0__prebuilt__[
                                        'a' /* default */
                                    ][child.type].save(props, child)
                                }

                                return null
                            })
                            .filter(function(x) {
                                return x
                            })

                        return wp.element.createElement(
                            'div',
                            { className: settings.class },
                            output
                        )
                    }
                })
            }

            /***/
        },
        /* 3 */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
            'use strict'
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__text__ = __webpack_require__(
                4
            )
            /* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__image__ = __webpack_require__(
                5
            )

            /* harmony default export */ __webpack_exports__['a'] = {
                text: __WEBPACK_IMPORTED_MODULE_0__text__['a' /* default */],
                image: __WEBPACK_IMPORTED_MODULE_1__image__['a' /* default */]
            }

            /***/
        },
        /* 4 */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
            'use strict'
            function _defineProperty(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    })
                } else {
                    obj[key] = value
                }
                return obj
            }

            var RichText = wp.editor.RichText

            /* harmony default export */ __webpack_exports__['a'] = {
                attributes: function attributes(child) {
                    return {
                        type: 'array',
                        source: 'children',
                        selector: '.' + child.name
                    }
                },
                edit: function edit(props, child) {
                    var attributes = props.attributes,
                        className = props.className,
                        setAttributes = props.setAttributes

                    var content = attributes[child.name]

                    var classes = child.name + ' ' + className

                    function onChangeContent(newContent) {
                        setAttributes(
                            _defineProperty({}, child.name, newContent)
                        )
                    }

                    return wp.element.createElement(RichText, {
                        tagName: 'p',
                        className: classes,
                        onChange: onChangeContent,
                        value: content
                    })
                },
                save: function save(props, child) {
                    // data attributes passed from editor
                    var attributes = props.attributes

                    // get content and classes relevant to this particular block

                    var content = attributes[child.name]
                    var classes = '' + child.name

                    return wp.element.createElement(RichText.Content, {
                        className: classes,
                        tagName: 'p',
                        value: content
                    })
                }
            }

            /***/
        },
        /* 5 */
        /***/ function(module, __webpack_exports__, __webpack_require__) {
            'use strict'
            function _defineProperty(obj, key, value) {
                if (key in obj) {
                    Object.defineProperty(obj, key, {
                        value: value,
                        enumerable: true,
                        configurable: true,
                        writable: true
                    })
                } else {
                    obj[key] = value
                }
                return obj
            }

            var MediaUpload = wp.editor.MediaUpload
            var Button = wp.components.Button

            /* harmony default export */ __webpack_exports__['a'] = {
                // attributes
                attributes: function attributes(child) {
                    return {
                        mediaID: {
                            type: 'number'
                        },
                        mediaURL: {
                            type: 'string',
                            source: 'attribute',
                            selector: 'img',
                            attribute: 'src'
                        },
                        width: {
                            type: 'number'
                        },
                        height: {
                            type: 'number'
                        }
                    }
                },

                // editing
                edit: function edit(props, child) {
                    var setAttributes = props.setAttributes,
                        attributes = props.attributes

                    // try to find correct attributes, default to empty object

                    var atts = attributes[child.name] || {}
                    var mediaID = atts.mediaID,
                        mediaURL = atts.mediaURL

                    // selecting the image

                    function onSelectImage(newImage) {
                        // console.log(newImage)
                        setAttributes(
                            _defineProperty({}, child.name, {
                                mediaURL: newImage.url,
                                mediaID: newImage.id,
                                width: newImage.width,
                                height: newImage.height
                            })
                        )
                    }

                    // edit block
                    return wp.element.createElement(MediaUpload, {
                        onSelect: onSelectImage,
                        type: 'image',
                        value: mediaID,
                        render: function render(_ref) {
                            var open = _ref.open
                            return wp.element.createElement(
                                Button,
                                {
                                    className: mediaID
                                        ? 'image-button'
                                        : 'button button-large',
                                    onClick: open
                                },
                                !mediaID
                                    ? 'Upload Image'
                                    : wp.element.createElement('img', {
                                          src: mediaURL
                                      })
                            )
                        }
                    })
                },
                save: function save(props, child) {
                    var attributes = props.attributes

                    // ignore if we don't have the correct content

                    if (!attributes || !attributes[child.name]) {
                        return ''
                    }

                    var _attributes$child$nam = attributes[child.name],
                        mediaID = _attributes$child$nam.mediaID,
                        mediaURL = _attributes$child$nam.mediaURL,
                        width = _attributes$child$nam.width,
                        height = _attributes$child$nam.height

                    if (mediaURL) {
                        return wp.element.createElement('img', {
                            'data-replace-with': 'responsive-image',
                            src: mediaURL,
                            'data-wp-id': mediaID,
                            width: width,
                            height: height
                        })
                    }

                    return ''
                }
            }

            /***/
        },
        /* 6 */
        /***/ function(module, exports) {
            // removed by extract-text-webpack-plugin
            /***/
        }
        /******/
    ]
)
