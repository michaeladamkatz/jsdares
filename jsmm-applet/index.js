/*jshint node:true jquery:true*/
"use strict";

module.exports.clayer = require('./clayer');
module.exports.editor = require('./editor');
module.exports.info = require('./info');
module.exports.jsmm = require('./jsmm');
module.exports.output = require('./output');
module.exports.robot = require('./robot');

module.exports.UI = function() { return this.init.apply(this, arguments); };
module.exports.UI.prototype = {
	icons: {dare: 'icon-file', console: 'icon-list-alt', canvas: 'icon-picture', robot: 'icon-th', info: 'icon-info-sign', home: 'icon-home'},
	paneOutputs: ['robot', 'console', 'canvas', 'info'],
	constructors: {
		robot: module.exports.output.Robot,
		console: module.exports.output.Console,
		canvas: module.exports.output.Canvas,
		info: module.exports.info.Info,
		input: module.exports.output.Input,
		Math: module.exports.output.Math
	},

	init: function($main, globalOptions) {
		if ($main === undefined) { // use modal mode
			this.$modal = $('<div class="ui-modal"></div>');
			// this.$modal.on('click', this.close.bind(this));
			$('body').append(this.$modal);

			this.$main = $('<div class="ui-modal-ui"></div>');
			this.$modal.append(this.$main);

			this.$close = $('<a href="#" class="ui-close">&times;</a>');
			this.$main.append(this.$close);
			this.$close.on('click', this.closeModal.bind(this));
		} else {
			this.$modal = null;
			this.$main = $main;
		}
		this.globalOptions = globalOptions || {};

		this.$main.addClass('ui-main');

		this.$background = $('<div class="ui-background"></div>');
		this.$main.append(this.$background);

		this.$arrow = $('<div class="arrow"><div class="arrow-head"></div><div class="arrow-body"></div></div>');
		this.$main.append(this.$arrow);

		this.$output = $('<div class="ui-output tabbable"></div>');
		this.$main.append(this.$output);

		this.$tabs = $('<ul class="nav nav-tabs"></ul>');
		this.$output.append(this.$tabs);
		this.$tabs.toggle(!this.globalOptions.hideTabs);

		this.$content = $('<div class="tab-content">');
		this.$output.append(this.$content);

		this.$editor = $('<div class="ui-editor"></div>');
		this.$toolbar = $('<div class="ui-toolbar"></div>');
		this.$main.append(this.$editor);
		this.$main.append(this.$toolbar);

		this.objects = [];
		this.editor = null;
		this.closeCallback = null;
		this.removeAll();
	},

	remove: function() {
		this.removeAll();
		this.$main.removeClass('ui-main');
		this.$background.remove();
		this.$output.remove();
		this.$editor.remove();
		this.$toolbar.remove();
		this.$arrow.remove();
		if (this.$modal !== null) {
			this.$close.remove();
			this.$modal.remove();
		}
	},

	removeAll: function() {
		for (var i=0; i<this.objects.length; i++) {
			this.objects[i].remove();
		}
		if (this.editor !== null) {
			this.editor.remove();
		}
		this.$tabs.children('li').remove();
		this.$content.children('div').remove();

		this.scope = {};
		this.objects = [];
		this.outputs = {};
		this.tabs = [];
		this.tabsByName = {};
	},

	loadOutputs: function(outputs) {
		for (var name in outputs) {
			var output;
			if (this.paneOutputs.indexOf(name) >= 0) {
				output = new this.constructors[name](this.editor, outputs[name], this.addTab(name));
			} else {
				output = new this.constructors[name](this.editor, outputs[name]);
			}
			this.registerObject(output);
			this.outputs[name] = output;

			if (name === 'input') {
				this.scope.document = output.getAugmentedDocumentObject();
				this.scope.window = output.getAugmentedWindowObject();

				var mouseObjects = outputs[name].mouseObjects || [];
				for (var i=0; i<mouseObjects.length; i++) {
					var outputName = mouseObjects[i];
					output.addMouseEvents(this.outputs[outputName].getMouseElement(), outputName, this.scope[outputName]);
				}
			} else if (output.getAugmentedObject !== undefined) {
				this.scope[name] = output.getAugmentedObject();
			}
		}

		this.editor.updateSettings(new module.exports.jsmm.Runner(this.editor, this.scope), this.outputs);
	},

	registerObject: function(obj) {
		this.objects.push(obj);
	},

	addTab: function(name) {
		var $tab = $('<li></li>');
		setTimeout(function() { $tab.addClass('tab-button-enabled'); }, 200*this.tabs.length + 300);
		this.$tabs.append($tab);

		var $link = $('<a href="#"><i class="' + this.icons[name] + ' icon-white"></i> ' + name + '</a>');
		$tab.append($link);

		$link.click((function(event) {
			event.preventDefault();
			this.selectTab(name);
		}).bind(this));

		var $pane = $('<div class="tab-pane"></div>');
		this.$content.append($pane);

		var $output = $('<div class="tab-output"></div>');
		$pane.append($output);

		this.tabs.push(name);
		this.tabsByName[name] = {$pane: $pane, $tab: $tab};
		return $output;
	},

	addEditor: function(options) {
		this.editor = new module.exports.editor.Editor(options, module.exports.jsmm, this.$editor, this.$toolbar);
		//this.$toolbar.removeClass('ui-toolbar-enabled');
		var $toolbar = this.$toolbar;
		//setTimeout(function() { $toolbar.addClass('ui-toolbar-enabled'); }, 200);
		return this.editor;
	},

	selectTab: function(name) {
		this.$content.children('.active').removeClass('active');
		this.$tabs.children('ul li.active').removeClass('active');
		this.tabsByName[name].$pane.addClass('active');
		this.tabsByName[name].$tab.addClass('active');
		if (this.outputs[name] !== undefined && this.outputs[name].setFocus !== undefined) this.outputs[name].setFocus();
	},

	getOutput: function(name) {
		return this.outputs[name];
	},

	loadDefault: function() {
		this.load({
			editor: {},
			outputs: {
				robot: {},
				console: {},
				canvas: {},
				info: {},
				input: {mouseObjects: ['canvas']},
				Math: {}
			}
		});
	},

	setCloseCallback: function(callback) {
		this.closeCallback = callback;
	},

	arrowPositions: { // dir, left, top
		'arrow-code': ['arrow-left', 750, 65],
		'arrow-step': ['arrow-up', 655, 40],
		'arrow-highlighting': ['arrow-up', 751, 40],
		'arrow-manipulation': ['arrow-up', 785, 40],
		'arrow-close': ['arrow-up', 1066, 3]
	},

	addArrows: function($el) {
		var $links = $el.find('a[href^="#arrow"]');
		var that = this;
		$links.on('mouseenter', function() { that.showArrow($(this).attr('href').substring(1)); });
		$links.on('mouseleave', function() { that.hideArrow(); });
		$links.on('click', function(e) { $(this).trigger('mouseenter'); that.animateArrow(); e.preventDefault(); });
		$links.addClass('arrow-link');
	},

	showArrow: function(str) {
		var pos = this.arrowPositions[str];
		if (pos === undefined) {
			if (str.indexOf('arrow-tab-') === 0) {
				var $tab = this.tabsByName[str.substring('arrow-tab-'.length)].$tab;
				console.log($tab, $tab.offset());
				pos = ['arrow-left', $tab.position().left+$tab.width()+5, 29];
			} else {
				pos = str.split(',');
			}
		}
		this.$arrow.addClass('arrow-active');
		this.$arrow.removeClass('arrow-left arrow-right arrow-up arrow-down arrow-animate');
		this.$arrow.addClass(pos[0]);
		this.$arrow.css('left', pos[1]);
		this.$arrow.css('top', pos[2]);
	},

	animateArrow: function() {
		this.$arrow.addClass('arrow-animate');
	},

	hideArrow: function() {
		this.$arrow.removeClass('arrow-active');
	},

	/// INTERNAL FUNCTIONS ///
	openModal: function() {
		this.$modal.addClass('ui-modal-active');
		var $main = this.$main;
		setTimeout(function() { $main.addClass('ui-modal-ui-active'); }, 0);
		$('body').addClass('modal-open'); // for Bootstrap specific fixes
	},

	closeModal: function(event) {
		event.preventDefault();
		this.removeAll();
		this.$modal.removeClass('ui-modal-active');
		this.$main.removeClass('ui-modal-ui-active');
		$('body').removeClass('modal-open');
		if (this.closeCallback !== null) this.closeCallback();
	}
};