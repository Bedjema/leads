
(($ => {
	/*
	Custom Rules
	*/

	// No White Space
	$.validator.addMethod("noSpace", (value, element) => {
		if ($(element).attr('required')) {
			return value.search(/^(?! *$)[^]+$/) == 0;
		}

		return true;
	}, 'Please fill this empty field.');

	/*
	Assign Custom Rules on Fields
	*/
	$.validator.addClassRules({
		'form-control': {
			noSpace: true
		}
	});

	$.validator.addMethod(
		'regex',
		function (e, t, r) {
			if ('' == e) return !0
			var a = r.test(e)
			return console.log(a), a
		},
		'Entrez la valeur correcte.'
	),
		$.validator.addClassRules({
			'code-postal': { regex: /(?!00000)[0-9]{5}/, minlength: 5 },
			'num-tel': { regex: /^[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}.[0-9]{2}/ },
			email: { regex: /^\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i }
		}),

	$('.validate-form').each(function () {
		$(this).validate({
			errorPlacement: function (error, element) {
				if (element.attr('type') == 'radio' || element.attr('type') == 'checkbox') {
					error.appendTo(element.closest('.form-group'));
				} else if (element.is('select') && element.closest('.custom-select-1')) {
					error.appendTo(element.closest('.form-group'));
				} else {
					if (element.closest('.form-group').length) {
						error.appendTo(element.closest('.form-group'));
					} else {
						error.insertAfter(element);
					}
				}
			},
			submitHandler: function (form) {
				var $submitButton = $(this.submitButton),
					submitButtonText = $submitButton.val();
				$submitButton.val($submitButton.data('loading-text') ? $submitButton.data('loading-text') : 'En traitement...').attr('disabled', true);
				form.submit();
				$(".g-recaptcha-checker").val("");
			}
		});
	});

})).apply(this, [jQuery]);

(window.form1Callback = function () {
	$('#form1 .g-recaptcha-checker').val('checked'),
		jQuery('#form1').valid(),
		$('.g-recaptcha div div iframe').addClass('g-recaptcha-checked')
});

(window.recaptcha1Expired = function () {
	$('#form1 .g-recaptcha-checker').val('')
});

(window.form2Callback = function () {
	$('#form2 .g-recaptcha-checker').val('checked'),
		jQuery('#form2').valid(),
		$('.g-recaptcha div div iframe').addClass('g-recaptcha-checked')
});

(window.recaptcha2Expired = function () {
	$('#form2 .g-recaptcha-checker').val('')
});

function sh_conj() {
	$('.conjoint-elm').show(),
		$('#CatSocialeConjoint-error').length &&
		$('#CatSocialeConjoint-error').show(),
		$('#DateNaissCojoint-error').length && $('#DateNaissCojoint-error').show()
}
function hd_conj() {
	$('.conjoint-elm').hide(),
		$("input[name*='DateNaissCojoint']").val(''),
		$("select[name*='CatSocialeConjoint']").val(''),
		$('#CatSocialeConjoint-error').length &&
		$('#CatSocialeConjoint-error').hide(),
		$('#DateNaissCojoint-error').length && $('#DateNaissCojoint-error').hide()
}
function sh_enft() {
	$('.enf-elm').show(),
		$('#NbrEnfants-error').length && $('#NbrEnfants-error').show()
}
function hd_enft() {
	$('.enf-elm').hide(),
		$("select[name*='NbrEnfants']").val(''),
		$('#NbrEnfants-error').length && $('#NbrEnfants-error').hide()
}

$('.form_tel_mask').mask('00.00.00.00.00');
$('.form_date_mask').mask('00/00/0000');
$('.form_cpl_mask').mask('00000');


$('.rap_grat').magnificPopup({
	type: 'inline',
	items: { src: '#rapp-grat' },
	closeOnBgClick: !1,
	preloader: !0,
	modal: !0,
	callbacks: {
		open: function () {
			$('.filter-bg').css('filter', 'blur(8px)')
		},
		close: function () {
			$('.filter-bg').css('filter', 'blur(0px)')
		}
	}
});

$(document).on('click', '.popup-dismiss', function (e) {
	$.magnificPopup.close(),
		$('.title-rapp').text(
			'Veuillez saisir votre num\xe9ro de t\xe9l\xe9phone'
		),
		$('#rapp-grat').children('.form_dem_content').show(),
		$('#nom_prenom').val(''),
		$('#numero_tel').val(''),
		$('#form_hr_rapp').length && $('#form_hr_rapp').remove()
});

(window.PARAM = {}),
      function (e, t) {
        e = e || {}
        var a = function (e, t) {
          return this.initialize(e, t)
        }
        ;(a.defaults = { cookieBarShowDelay: 2e3 }),
          (a.prototype = {
            initialize: function (e, t) {
              return (
                (this.$el = e),
                this.setData().setOptions(t).build().events(),
                this
              )
            },
            setData: function () {
              return this.$el.data('__ck', this), this
            },
            setOptions: function (e) {
              return (
                (this.options = t.extend(!0, {}, a.defaults, e, {
                  wrapper: this.$el
                })),
                this
              )
            },
            build: function () {
              var e = this
              if (
                (t.cookie('cookie-privacy-bar') ||
                  setTimeout(function () {
                    e.options.wrapper.addClass('show')
                  }, e.options.cookieBarShowDelay),
                t.cookie('cookie-gdpr-preferences'))
              )
                for (
                  var a = t.cookie('cookie-gdpr-preferences').split(','), o = 0;
                  o < a.length;
                  o++
                )
                  t('input[value="' + a[o] + '"]').get(0) &&
                    t('input[value="' + a[o] + '"]').is(':checkbox') &&
                    t('input[value="' + a[o] + '"]').prop('checked', !0)
              return this
            },
            events: function () {
              var e = this
              return (
                e.options.wrapper
                  .find('.gdpr-agree-trigger')
                  .on('click', function (a) {
                    a.preventDefault(),
                      t.cookie('cookie-privacy-bar', !0),
                      e.removeCookieBar()
                  }),
                e.options.wrapper
                  .find('.gdpr-preferences-trigger')
                  .on('click', function (e) {
                    e.preventDefault(),
                      t('.gdpr-preferences-popup').toggleClass('show')
                  }),
                t('.gdpr-close-popup').on('click', function (e) {
                  e.preventDefault(),
                    t('.gdpr-preferences-popup').toggleClass('show')
                }),
                t('.gdpr-preferences-popup').on('click', function (e) {
                  t(e.target)
                    .closest('.gdpr-preferences-popup-content')
                    .get(0) || t('.gdpr-preferences-popup').toggleClass('show')
                }),
                t('.gdpr-preferences-form').on('submit', function (a) {
                  a.preventDefault()
                  var o = t(this)
                  o.find('button[type="submit"]').text('En cours...')
                  var i = []
                  o.find('.gdpr-input').each(function () {
                    ;((t(this).is(':checkbox') && t(this).is(':checked')) ||
                      t(this).is(':hidden')) &&
                      i.push(t(this).val())
                  }),
                    t.cookie('cookie-privacy-bar', !0),
                    t.cookie('cookie-gdpr-preferences', i),
                    t.ajax({
                      type: 'post',
                      url: './actions/cookies-popup-sessions.html',
                      data: { cookie_array: i },
                      success: function () {}
                    }),
                    setTimeout(function () {
                      o
                        .find('button[type="submit"]')
                        .text('Enregistr\xe9e!')
                        .removeClass('btn-primary')
                        .addClass('btn-success'),
                        setTimeout(function () {
                          t('.gdpr-preferences-popup').toggleClass('show'),
                            e.removeCookieBar(),
                            o
                              .find('button[type="submit"]')
                              .text('Sauvegarder')
                              .removeClass('btn-success')
                              .addClass('btn-primary'),
                            location.reload()
                        }, 500)
                    }, 1e3)
                }),
                t('.gdpr-reset-cookies').on('click', function (a) {
                  a.preventDefault(),
                    e.clearCookies(),
                    location.reload(),
                    t.ajax({
                      type: 'post',
                      url: './actions/cookies-popup-sessions.html',
                      data: { cookie_array: [] },
                      success: function () {}
                    })
                }),
                t('.gdpr-open-preferences').on('click', function (e) {
                  e.preventDefault(),
                    t('.gdpr-preferences-popup').toggleClass('show')
                }),
                this
              )
            },
            removeCookieBar: function () {
              return this.options.wrapper.removeClass('show'), this
            },
            clearCookies: function () {
              return (
                t.removeCookie('cookie-privacy-bar'),
                t.removeCookie('cookie-gdpr-preferences'),
                this
              )
            }
          }),
          t.extend(e, { COOKIESPOP: a }),
          (t.fn.PARAMCOOKIESPOP = function (e) {
            return this.map(function () {
              var o = t(this)
              return o.data('__ck') ? o.data('__ck') : new a(o, e)
            })
          })
      }.apply(this, [window.PARAM, jQuery]),
      function (e) {
        'use strict'
        e.isFunction(e.fn.PARAMCOOKIESPOP) &&
          e(function () {
            e('[cookies-popup]:not(.manual)').each(function () {
              e(this).PARAMCOOKIESPOP(void 0)
            })
          })
      }.apply(this, [jQuery]);