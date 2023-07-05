function isPhone() {
    return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent))
}
 
 
const About = () => {
    const toggleDuration = `all 700ms ease-in-out`;
    const btnDuration = 400;
    const errorDuration = 700;
    const errorDelay = 5000;

    const $aboutWrap = $js(`#aboutWrap`);
    const $emailAddress = $aboutWrap.find(`#emailAddress`);
    const $emailName = $aboutWrap.find(`#emailName`);
    const $emailLetter = $aboutWrap.find(`#emailLetter`);
    const $errorState = $aboutWrap.find(`#aboutError`);
    const $sendEmail = $aboutWrap.find(`#sendEmail`);
    let oldValue = '';
 
 

    $js(`#aboutClose`).onClick(() => {
         window.location.href = '/Index/index.html'
         return;
        $aboutWrap.animate({
            'transform': 'translateX(100%)'
        }, toggleDuration, () => {
            $aboutWrap.css({ 
                'opacity': '0'
            });
            $emailAddress.value('');
            $emailName.value('');
            $emailLetter.value('');
            $errorState.value('');
            setBtn(false)
        }) 
    })

    function showError(err) {
        if ($sendEmail.hasClass(`btn-active`))
                $sendEmail.removeClass(`btn-active`)


        $errorState.text(err);
        $errorState.animate({
            'opacity': '1'
        }, errorDuration, () => {
            setTimeout(() => {
                $errorState.animate({
                    'opacity': '0'
                }, errorDuration);
            }, errorDelay);
        });
    }
    function validateAddress() {
        const regexExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;
        return regexExp.test($emailAddress.value());
    }
    function setBtn(state) {
        if (state) { 
            if (!$sendEmail.hasClass(`btn-active`)) {
                $sendEmail.animate({
                    'opacity': '0'
                }, btnDuration, () => {
                    $sendEmail.text('Send a letter');
                    $sendEmail.addClass(`btn-active`);
                    $sendEmail.animate({
                        'opacity': '1'
                    }, btnDuration)
                })
            }
        }
        else {
            if ($sendEmail.hasClass(`btn-active`)) {
                $sendEmail.animate({
                    'opacity': '0'
                }, btnDuration, () => {
                    $sendEmail.text('Contact me');
                    $sendEmail.removeClass(`btn-active`)
                    $sendEmail.animate({
                        'opacity': '1'
                    }, btnDuration)
                })
            }
                
        }
    }



   $sendEmail.onClick((e, event) => {
        if (e.hasClass(`btn-active`)) {
            Email.send({
                SecureToken: "0e080ffd-8308-425e-8cf9-093fb6419f45",
                To : 'kaarst@ya.ru',
                From : "kaarst@ya.ru", // fixme 
                Subject: 'Riverwood: ' + $emailName.value(),
                Body : $emailLetter.value() + '\n\n From ' + $emailAddress.value()
            })
            e.text('Sent!')
            $emailAddress.value('');
            $emailName.value('');
            $emailLetter.value('');
            $errorState.value('');
            e.css({
                'color': 'var(--based-color)',
                'background': 'var(--accent-color)'
            })
            setTimeout(() => {
                setBtn(false);
                e.css({
                    'color': '#',
                    'background': '#'
                })
            }, 3000);
        }
        else {
            showError(`Why did you... click me...`)
        }
    })



   
    $emailAddress.onEvent('keyup', (e, event) => {
        if (validateAddress()) {
            if (event.key == 'Enter')
                $emailName.get().focus();
        }
        if (event.key == 'ArrowDown') {
            $emailName.get().focus();
        }
    })
    $emailName.onEvent('keyup', (e, event) => { 
        if (event.key == 'ArrowDown' || e.value() != '' && event.key == 'Enter')
            $emailLetter.get().focus(); 
        else if (event.key == 'ArrowUp') 
            $emailAddress.get().focus();
    })
    $emailLetter.onEvent('keydown', (e, event) => {
        oldValue = e.value();
        if (event.key == 'ArrowUp') {
            $emailName.get().focus();
        }
    })



    $emailAddress.onEvent('input', (e, event) => {
        if (validateAddress()) {
            if (event.key == 'Enter')
                $emailName.get().focus();
            if ($emailName.value() != '' && $emailLetter.value() != '')
                setBtn(true);
        }
        else 
            setBtn(false)
        if (event.key == 'ArrowDown') {
            $emailName.get().focus();
        }
    })
    $emailName.onEvent('input', (e) => {
        if ($emailAddress.value() == '') {
            e.value('');
            $emailAddress.get().focus()
            return showError('Your@email first');
        }
        if (!validateAddress()) {
            e.value('');
            $emailAddress.get().focus()
            return showError('Incorrect @mail address :c');
        }
        if (e.value() == '' || $emailLetter.value() == '') 
            return setBtn(false)
        setBtn(true)
    })
    $emailLetter.onEvent('input', (e) => {
        if ($emailAddress.value() == '') {
            e.value('');
            $emailAddress.get().focus()
            return showError('Your@email first');
        }
        if (!validateAddress()) {
            e.value('');
            $emailAddress.get().focus()
            return showError('Incorrect @mail address :c');
        }
        if ($emailName.value() == '') {
            e.value('');
            $emailName.get().focus()
            return showError('Please, introduse yourself');
        }
    
        setBtn(e.value() != '');
    })
    $emailLetter.onEvent('input', (e) => {
        let val = e.value();
        if (e.get().scrollHeight > e.rect().height) {
            e.value(oldValue);
            showError('Brevity is the sister of talent..')
            return;
        }
        if (e.get().scrollWidth > e.rect().width) {
            log('fd')
            if (!e.hasClass('align-left'))
                e.addClass(`align-left`)
        }
        if (val.length < 25)  {
            e.removeClass(`align-left`)
        }
    }) 
}
 



document.addEventListener("DOMContentLoaded", () => { 
   About()
});  

 