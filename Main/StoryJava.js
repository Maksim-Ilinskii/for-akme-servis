(function () {
    // v1.0.1
    'use strict';

    // selectors to ignore
    var ignored = ['a', ':button', '*[role="button"]', '.continue-macro-ignore', '#ui-bar', '#ui-dialog'];

    var _i = 0;

    prehistory['%%continue-expiration'] = function () {
        _i = 0;
    };

    function ns () {
        // create unique namespace
        var namespace = '.' + Date.now().toString(36) + '-' + _i;
        _i++;
        return namespace;
    }

    function ignoreMe () {
        $(document).on('click.continue-macro keyup.continue-macro', ignored.join(', '), function (ev) { 
            ev.stopPropagation(); 
        });
    }

    function addIgnore () {
        if (State.length > 0) {
            return false;
        }
        var args = [].slice.call(arguments).flatten();
        ignored = ignored.concat(args);
        return true;
    }

    $(document).one(':passagerender', function () {
        // on first render, set up the ignore list
        ignoreMe();
    });

    // continue functions
    function cont (press, cb) {
        var namespace = ns();
        if (!cb || typeof cb !== 'function') {
            return;
        }
        var events = 'click.continue-macro' + namespace;
        if (press) {
            events = events + ' keyup.continue-macro' + namespace;
        }
        $(document).one(events, function () {
            cb.call();
            // expire all namespaced events
            $(document).off(namespace);
        });
    }

    function reset () {
        var args = [].slice.call(arguments).flatten();
        ignored = ignored.concat(args);
        $(document).off('.continue-macro');
        ignoreMe();
    }

    // macros

    // <<ignore selectors...>>
    Macro.add('ignore', {
        handler : function () {
            var check = addIgnore(this.args);
            if (!check) {
                return this.error('the <<ignore>> macro should only be run from StoryInit or equivalent.');
            }
        }
    });

    // <<cont [append] [press]>>Code<</cont>>
    Macro.add('cont', {
        tags : null,
        handler : function () {
            var append = this.args.includes('append'), // append keyword
                press = this.args.includesAny('key', 'keypress', 'press', 'button'), // keypress keyword
                wiki = this.payload[0].contents, // content to wikify
                $output; // output element (if needed)

            if (append) {
                // create output element, but only if needed (e.g. if appending content)
                $output = $(document.createElement('span'))
                    .addClass('macro-' + this.name)
                    .appendTo(this.output);
            }

            cont(press, this.createShadowWrapper( function () {
                // wikify 
                if (append && $output && $output instanceof $) {
                    $output.wiki(wiki);
                } else {
                    $.wiki(wiki);
                }
            }));
        }
    });

    // APIs

    setup.cont = cont;
    setup.cont.ignore = addIgnore;
    setup.cont.reset = reset;

    window.cont = window.cont || setup.cont;

}());


// Player

Macro.add('pln', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="playersp ' + id + '">';
		output += '<span class="playerav" style="margin-right:1.25rem"></span>';
		output += '<div class="playername" style="display:block;padding:3.125rem 0rem 0rem 0rem">$Player.name</div>' + '<hr style="display:block;margin-top:3.75rem;height:1px;border-width:0;color:rgb(86, 26, 14);background-color:rgb(86, 26, 14)">' + this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});

// Playerinter

Macro.add('pli', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="playerinter ' + id + '">';
		output += this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});


// Gerrit
Macro.add('ger', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="gerritsp ' + id + '">';
		output += '<span class="gerritav" style="margin-right:1.25rem"></span>';
		output += '<div class="gerritname" style="display:block;padding:3.125rem 0rem 0rem 0rem">$Gerrit.name</div>' + '<hr style="display:block;margin-top:3.75rem;height:1px;border-width:0;color:rgb(37, 68, 70);background-color:rgb(37, 68, 70)">' + this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});

// Galeran
Macro.add('gal', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="galeransp ' + id + '">';
		output += '<span class="galeranav" style="margin-right:1.25rem;"></span>';
		output += '<div class="galeranname" style="display:block;padding:3.125rem 0rem 0rem 0rem">$Galeran.name</div>' + '<hr style="display:block;margin-top:3.75rem;height:1px;border-width:0;color:rgb(8, 72, 97);background-color:rgb(8, 72, 97)">' + this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});

// Basten Pruis
Macro.add('bas', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="bastensp ' + id + '">';
		output += '<span class="bastenav" style="margin-right:1.25rem"></span>';
		output += '<div class="bastenname" style="display:block;padding:3.125rem 0rem 0rem 0rem">$Basten.name</div>' + '<hr style="display:block;margin-top:3.75rem;height:1px;border-width:0;color:rgb(61, 80, 127);background-color:rgb(61, 80, 127)">' + this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});

// Maup Kornellisen

Macro.add('maup', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="maupsp ' + id + '">';
		output += '<span class="maupav" style="margin-right:1.25rem"></span>';
		output += '<div class="maupname" style="display:block;padding:3.125rem 0rem 0rem 0rem">$Maup.name</div>' + '<hr style="display:block;margin-top:3.75rem;height:1px;border-width:0;color:#855a11;background-color:#855a11">' + this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});

// Madvena
Macro.add('mad', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="madsp ' + id + '">';
		output += '<span class="madav" style="margin-right:1.25rem"></span>';
		output += '<div class="madname" style="display:block;padding:3.125rem 0rem 0rem 0rem">$Madvena.name</div>' + '<hr style="display:block;margin-top:3.75rem;height:1px;border-width:0;color:rgb(152, 33, 108);background-color:rgb(152, 33, 108)">' + this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});

// Bandit Chief
Macro.add('bdtchief', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="bdtchiefsp ' + id + '">';
		output += '<span class="bdtchiefav" style="margin-right:1.25rem"></span>';
		output += '<div class="bdtchiefname" style="display:block;padding:3.125rem 0rem 0rem 0rem">Главарь Бандитов</div>' + '<hr style="display:block;margin-top:3.75rem;height:1px;border-width:0;color:rgb(201, 42, 42);background-color:rgb(201, 42, 42)">' + this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});


// Bandit 1
Macro.add('bdt1', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="bdt1sp ' + id + '">';
		output += '<span class="bdt1av" style="margin-right:1.25rem"></span>';
		output += '<div class="bdt1name" style="display:block;padding:3.125rem 0rem 0rem 0rem">Бандит #1</div>' + '<hr style="display:block;margin-top:3.75rem;height:1px;border-width:0;color:rgb(201, 42, 42));background-color:rgb(201, 42, 42)">' + this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});

// Bandit 2
Macro.add('bdt2', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="bdt2sp ' + id + '">';
		output += '<span class="bdt2av" style="margin-right:1.25rem"></span>';
		output += '<div class="bdt2name" style="display:block;padding:3.125rem 0rem 0rem 0rem">Бандит #2</div>' + '<hr style="display:block;margin-top:3.75rem;height:1px;border-width:0;color:rgb(201, 42, 42);background-color:rgb(201, 42, 42)">' + this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});


// Bandit Weasel
Macro.add('weasel', {
	tags     : null,
	handler  : function () {
		var id = this.args[0], name = id;
		if (this.args.length > 1) name = this.args[1];
		var output = '<div class="weaselsp ' + id + '">';
		output += '<span class="weaselav" style="margin-right:1.25rem"></span>';
		output += '<div class="weaselname" style="display:block;padding:3.125rem 0rem 0rem 0rem">Бандит #3</div>' + '<hr style="display:block;margin-top:3.75rem;height:1px;border-width:0;color:rgb(201, 42, 42);background-color:rgb(201, 42, 42)">' + this.payload[0].contents + '</div>';
		$(this.output).wiki(output);
	}
});



/* Set up a handler for the enabling and disabling of the history-backward/-forward buttons. */
jQuery(document)
	.on(':historyupdate.ui-bar',
		(function ($backward, $forward) {
			return function () {
				$backward.prop('disabled', State.length < 2);
				$forward.prop('disabled', State.length === State.size);
			};
		})(jQuery('#history-backward'), jQuery('#history-forward'))
	);

/* Set up a handler for the selection of the history-backward button. */
jQuery('#history-backward')
	.prop('disabled', State.length < 2)
	.ariaClick({
		label : L10n.get('uiBarBackward')
	}, function () {
		Engine.backward()
	});

/* Set up a handler for the selection of the history-forward button. */
jQuery('#history-forward')
	.prop('disabled', State.length === State.size)
	.ariaClick({
		label : L10n.get('uiBarForward')
	}, function () {
		Engine.forward()
	});







    postrender["Associate Special Passages"] = function (content, taskName) {
	setPageElement("story-title", "StoryTitle", Story.title);
	setPageElement("story-banner","StoryBanner");
	setPageElement("story-subtitle","StorySubtitle");
	setPageElement("story-author","StoryAuthor");
	setPageElement("story-caption","StoryCaption");
}

setup.mydice=function(){
	return[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100].random();
	}