/*jshint node:true jquery:true*/
"use strict";

module.exports = function(info) {
	info.tables.push({
		html: '<p><span class="info-table-output"><i class="icon-picture icon-white"></i> canvas</span></p><p>The canvas is used to draw shapes on, and is the actual HTML5 element that is supported by most web browsers. This means that any program you write for this canvas can also be used outside of this environment, on any other site. It is also very suitable for programming games, by using events.</p>',
		list: [
			{
				name: 'canvas.getContext("2d")',
				id: 'canvas.getContext',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p>This is a command that should always be called before using the canvas. It returns a two-dimensional canvas context object, which can be stored in a variable. Then it can be used to draw 2d shapes on the canvas. We do not use 3d contexts here, as they are still very experimental and difficult to use.</p>');
					info.canvasExample(infoTable, $content, '// now we can use the context to draw!\n\ncontext.fillText("Hello World!", 10, 50);');
				}
			},
			{
				name: 'canvas.width',
				id: 'canvas.width',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p>Use <var>canvas.width</var> to get the width of the canvas in pixels. This width is read-only; it cannot be changed.</p>');

					info.consoleExample(infoTable, $content, 'console.log(canvas.width);', '540');
				}
			},
			{
				name: 'canvas.height',
				id: 'canvas.height',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p>Use <var>canvas.height</var> to get the height of the canvas in pixels. This height is read-only; it cannot be changed.</p>');

					info.consoleExample(infoTable, $content, 'console.log(canvas.height);', '540');
				}
			},
			{
				name: 'context.fillRect(x, y, width, height)',
				id: 'context.fillRect',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p><var>context.fillRect</var> draws a filled rectangle on the canvas. The color set in <var>context.fillStyle</var> is used, by default this is black.</p>');
					info.canvasExample(infoTable, $content, 'context.fillRect(20, 40, 10, 10);\ncontext.fillStyle="#a00";\ncontext.fillRect(70, 70, 30, 60);');
				}
			},
			{
				name: 'context.strokeRect(x, y, width, height)',
				id: 'context.strokeRect',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p><var>context.strokeRect</var> draws the outline of a rectangle on the canvas. The color set in <var>context.strokeStyle</var> is used, by default this is black.</p>');
					info.canvasExample(infoTable, $content, 'context.strokeRect(20, 40, 10, 10);\ncontext.strokeStyle="#00a";\ncontext.strokeRect(70, 70, 30, 60);');
				}
			},
			{
				name: 'context.clearRect(x, y, width, height)',
				id: 'context.clearRect',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p><var>context.clearRect</var> clears a rectangle on the canvas. The area that is removes becomes transparent again.</p>');
					info.canvasExample(infoTable, $content, 'context.fillRect(20, 20, 100, 100);\ncontext.clearRect(40, 40, 30, 60);');
				}
			},
			{
				name: 'context.fillText(text, x, y)',
				id: 'context.fillText',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p><var>context.fillText</var> draws a string at some location. There are also a few commands to change the style, such as <var>context.font</var> for the font style and size, and <var>context.fillStyle</var> for the color.</p>');
					info.canvasExample(infoTable, $content, 'context.fillText("Hello World!", 10, 30);\n\ncontext.fillStyle = "#00a";\ncontext.font = "40pt Calibri";\ncontext.fillText(4*4*4, 50, 80);');
				}
			},
			{
				name: 'context.beginPath()',
				id: 'context.beginPath',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p>The path functionality of the canvas allows you to create complex shapes, and then draw an outline using <var>context.stroke</var>, or fill it in using <var>context.fill</var>.</p>');
					info.canvasExample(infoTable, $content, 'context.beginPath();\ncontext.moveTo(50, 50);\ncontext.lineTo(100, 100);\ncontext.lineTo(50, 100);\ncontext.stroke();');
				}
			},
			{
				name: 'context.closePath()',
				id: 'context.closePath',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p>When a path is closed using <var>context.closePath</var>, this just means a line is drawn to the beginning of the path. You can then draw the path using either <var>context.stroke</var> or <var>context.fill</var>.</p>');
					info.canvasExample(infoTable, $content, 'context.beginPath();\ncontext.moveTo(50, 50);\ncontext.lineTo(100, 100);\ncontext.lineTo(50, 100);\ncontext.closePath();\ncontext.stroke();');
				}
			},
			{
				name: 'context.moveTo(x, y)',
				id: 'context.moveTo',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p><var>context.moveTo</var> moves the current position without drawing, when using the path functionality of the canvas.</p>');
					info.canvasExample(infoTable, $content, 'context.beginPath();\ncontext.moveTo(50, 50);\ncontext.lineTo(100, 100);\ncontext.stroke();');
				}
			},
			{
				name: 'context.lineTo(x, y)',
				id: 'context.lineTo',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p><var>context.lineTo</var> adds a line segment from the previous position, to a new one, when using the path functionality of the canvas.</p>');
					info.canvasExample(infoTable, $content, 'context.beginPath();\ncontext.moveTo(50, 50);\ncontext.lineTo(100, 100);\ncontext.stroke();');
				}
			},
			{
				name: 'context.arc(x, y, radius, startAngle, endAngle)',
				id: 'context.arc',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p>You can draw complete circles or parts of them, arcs, using <var>context.arc</var>. The xy-position defines the center of the circle, and angles are given in radians, from 0 to 6.28 (2&pi;).</p>');
					info.canvasExample(infoTable, $content, 'context.beginPath();\ncontext.arc(60, 75, 20, 0.00, 6.28);\ncontext.fill();\n\ncontext.beginPath();\ncontext.arc(90, 75, 20, 6.28/4, 6.28*3/4);\ncontext.strokeStyle = "#a00";\ncontext.stroke();');
				}
			},
			{
				name: 'context.fill()',
				id: 'context.fill',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p>A path can be finished using <var>context.fill</var>, which fills the path using the color set in <var>context.fillStyle</var>.</p>');
					info.canvasExample(infoTable, $content, 'context.beginPath();\ncontext.arc(75, 75, 40, 0.00, 6.28);\ncontext.fillStyle = "#a0a";\ncontext.fill();');
				}
			},
			{
				name: 'context.stroke()',
				id: 'context.stroke',
				// outputs: ['canvas'],
				outputs: [],
				makeContent: function(infoTable, $content) {
					$content.html('<p>A path can be finished using <var>context.stroke</var>, which draws the path using the color set in <var>context.strokeStyle</var>.</p>');
					info.canvasExample(infoTable, $content, 'context.beginPath();\ncontext.arc(75, 50, 50, 0.00, 3.14);\ncontext.strokeStyle = "#0a0";\ncontext.stroke();');
				}
			}
		]
	});
};
