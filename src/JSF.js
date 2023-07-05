const log = console.log.bind(document);
// jquery-like-funcs
const $js = (str = null) => {
    return new JSFeatures(str);
};
class JSFeatures {
    e; deepthElem;

    constructor(elem = null) {
        if (elem == null) return this;
        this.deepthElem = document;
        if (typeof(elem) != 'string') {
            this.e = Array.from(elem);
            return;
        }
        while (elem.indexOf(' ') > -1) {
            this.e = Array.from(this.find(elem, false, true).e)
            return;
        }
        if (elem.indexOf('#') > -1) 
            elem = [document.getElementById(elem.replace('#', ''))];
        else if (elem.indexOf('.') > -1) 
            elem = this.deepthElem.getElementsByClassName(elem.replace('.', ''));
        else { 
            // log(`in: ${elem}`); log(this.parent)
            elem = this.deepthElem.getElementsByTagName(elem); 
        }
        this.e = Array.from(elem); 
    } 
    get(index = 0) {
        if (typeof(index) == 'number') return this.e && this.e[index]|| null;
        let childGroup = []
        for(let i = 0; i < index.length; i++)
            childGroup.push(this.e[index[i]]);
        return childGroup;
    } 
    size() {
        return this.e && this.e.length || 0;
    }
    find(elem, deepth = false, fromConstructor = false) {
        if (!fromConstructor && (!this.e || this.e.length == 0)) return new JSFeatures([]);
        if (typeof(elem) == 'number') { 
            return new JSFeatures([this.e[elem]]);
        }
        else if (typeof(elem[0]) == 'number') {
            let childGroup = new JSFeatures([]);
            for(let i = 0; i < elem.length; i++) {
                childGroup.e.push(this.e[elem[i]]);
            }
            return childGroup;
        } 
        this.deepthElem = this.get() || document 
        let a = [];
       
        while (elem.indexOf(' ') > -1) {  
            let nextDeepthParent = this.find(elem.replace(/\s+[\S\s]+/g, ''), deepth, fromConstructor);
            elem = elem.replace(/^\S+\s+/g, '')
            for(let i = 0; i < nextDeepthParent.size(); i++) {
                let p = nextDeepthParent.find(i, deepth, false); 
                let childArr = p.find(elem, 1, false);  
                for (let i = 0; i < childArr.size(); i++)
                    a.push(childArr.get(i)); 
                
            }
            return new JSFeatures(a);
        }
        if (elem.indexOf('#') > -1) 
            elem = [document.getElementById(elem.replace('#', ''))];
        else if (elem.indexOf('.') > -1) 
            elem = this.deepthElem.getElementsByClassName(elem.replace('.', ''));
        else {
            elem = this.deepthElem.getElementsByTagName(elem); 
        }
        
        
        return new JSFeatures(elem);
    } 
    not(elem) {
        let excluded = new JSFeatures(elem.e || elem);
        let output = [];
        let passed = false;
        for (let i = 0; i < this.size(); i++) {
            passed = true;
            for(let j = 0; j < excluded.size(); j++) {
                if (excluded.get(j) == this.get(i)) {
                    passed = false;
                    break;
                }
            }
            if (passed)
                output.push(this.get(i))
        } 
        excluded.e = output;
        return excluded;
    }

    




    empty() {
        if (!this.e || !this.size()) return this;
        else if (this.size() > 1) 
            this.every(e => {
                while(e.firstElementChild) 
                    e.firstElementChild.remove(); 
            })
        else {
            while(this.get().firstElementChild) 
                this.get().firstElementChild.remove();
        }
        return this;
    }
    css(obj) {
        if (!this.e || !this.size()) return this;
        if (!obj) return this.#Exeption('Invalid css object')
        // obj is key-value css;
        let keys = Object.keys(obj);
        let styles =  Object.values(obj);
        if (this.size() > 1)
            this.every(e => {
                this.#CSS_Single(e, keys, styles);
            })
        else 
            this.#CSS_Single(this.get(), keys, styles);
        return this;
    }
    animate(obj, transition, f = null) {
        if (!this.e || !this.size()) return this;
        if (!obj) return this.#Exeption('Invalid css object')
        if (transition == undefined) return this.#Exeption('Invalid duration')

        obj['transition'] = typeof(transition) == 'number' ? 
            `all ${transition}ms ease 0s` : 
            transition;
        let duration = parseFloat(obj['transition'].split(/\D+/g)[1])
        if (this.size() > 1) {
            this.every(e => {
                this.#Animate_Single(e, duration, f)
            })
        }
        else
            this.#Animate_Single(this.get(), duration, f)
        this.css(obj)
        return this;
    }
    fadeIn(duration, display, f) {
        if (!this.e || !this.size()) return this;
        if (duration == undefined) return this.#Exeption('Invalid duration')

        if (display) this.css({'display': display})
        this.css({'opacity': '0'})
        setTimeout(() => {
            this.animate({
                'opacity': '1'
            }, duration, f)
        }, 1);
        return this;
    }
    fadeOut(duration, f) {
        if (!this.e || !this.size()) return this;
        if (duration == undefined) return this.#Exeption('Invalid duration')
        
        this.css({
            'opacity': '1'
        })
        setTimeout(() => {
            this.animate({
                'opacity': '0'
            }, duration, f)
            setTimeout(() => {
                this.css({'display': 'none'})
            }, duration);
        }, 1); 
    }
    scroll(y = null, duration = 0) {
        if (!this.e || !this.size()) return this;
        if (y == null) return this.get().scrollTop;

        let startTime = new Date().getTime();
        if (this.size() > 1)
            this.every(e => { this.#Scroll_Single(e, startTime, y, duration) })
        else 
            this.#Scroll_Single(this.get(), startTime, y, duration)
        return this;
    }


    



    // getters & setters
    text(text = null) {
        if (text == null) {
            if (!this.e || !this.size()) 
                return this.#Exeption('Object is empty');
            return this.get().innerText;
        }
        if (!this.e || !this.size()) return this;
        if (this.size() > 1) 
            this.every(e => {e.innerText = text})
        else 
            this.get().innerText = text;
        return this; 
    }
    value(text = null) {
        if (text == null) {
            if (!this.e || !this.size()) 
                return this.#Exeption('Object is empty');
            return this.get().value;
        }
        if (!this.e || !this.size()) return this;
        if (this.size() > 1) 
            this.every(e => {e.value = text})
        else 
            this.get().value = text;
        return this; 
    }
    ihtml(text = null) {
        if (text == null) {
            if (!this.e || !this.size()) 
                return this.#Exeption('Object is empty');
            return this.get().innerHTML;
        }
        if (!this.e || !this.size()) return this;
        if (this.size() > 1) 
            this.every(e => {e.innerHTML = text})
        else 
            this.get().innerHTML = text;
        return this; 
    }
    ohtml(text = null) {
        if (text == null) {
            if (!this.e || !this.size()) 
                return this.#Exeption('Object is empty');
            return this.get().outerHTML;
        }
        if (!this.e || !this.size()) return this;
        if (this.size() > 1) 
            this.every(e => {e.outerHTML = text})
        else 
            this.get().outerHTML = text;
        return this; 
    }

 
    index(obj) { 
        if (!this.e || !this.size()) return -1;
        if (!obj) {
            if (!this.e || !this.size()) return -1;
            let parentChilds = this.get().parentElement.children;
            for (let i = 0; i < parentChilds.length; i++) 
                if (parentChilds[i] == this.get())
                    return i;
            return -1;
        }
        if (typeof(obj) == 'string') obj = this.find(obj).get();
        else if (obj.e) obj = obj.get()
        for (let i = 0; i < this.size(); i++) 
            if (obj == this.get(i))
                return i;
        return -1;
    }
    attr(attr, value = null) {
        if (value == null) {
            if (!this.e || !this.size())
                return this.#Exeption('Object is empty');
            return this.get().getAttribute(attr);
        }
        if (!this.e || !this.size()) return this;
        if (!attr) return this.#Exeption('Invaid attr name');
        if (this.size() > 1)
            this.every((e) => { e.setAttribute(attr, value) })
        else 
            this.get().setAttribute(attr, value);
        return this;
    }
    id(str = null) {
        return this.attr('id', str);
    }
    classList(value = null) { 
        return this.attr('class', value)
    }

    addClass(classname) { 
        for (let i = 0; i < this.size(); i++) 
            this.get(i).classList.add(classname); 
        return this;
    }
    removeClass(classname = null) { 
        for (let i = 0; i < this.size(); i++) {
            if (classname != null) 
                this.e[i].classList.remove(classname);
            else 
                this.get(i).className = ' ';
        }
        return this;
    }
    toggleClass(classname) {
        for (let i = 0; i < this.size(); i++) {
            this.e[i].classList.toggle(classname);
        }
        return this;
    }
    hasClass(classname) { 
        if (!this.e || !this.size()) return this.#Exeption('Object is empty');
        return this.get().classList.contains(classname);
    }
    

    rect() {
        if (!this.e || !this.size()) return this.#Exeption(`Object is empty`);
        return this.get().getBoundingClientRect();
    }
    parent(str = null) {
        if (!this.e || !this.size()) return this.#Exeption('Object is empty');
        if (!str) return new JSFeatures([this.get().parentNode]);        
        return new JSFeatures([this.get().parentElement.closest(str)]);
    }
    



    



    // EVENTS
    onEvent(type, f) {
        if (!this.e || !this.size()) return this;
        if (!type) return this.#Exeption('Invaid event type');
        if (!f) return this.#Exeption('Invaid event function');
        if (this.size() > 1)
            this.every((e, i) => {
                e.addEventListener(type, (event) => { 
                    f(new JSFeatures([e]), event, i) 
                });
            })
        else 
            this.get().addEventListener(type, event => { f(new JSFeatures([this.get()]), event, 0) });
    }
    onClick(f) {
        this.onEvent('click', f)
    }
    trigger(str) {
        if (!str) return this.#Exeption('Invaid event type');
        if (!this.e || !this.size()) return this;
        if (this.size() > 1) 
            this.every(e => { e.dispatchEvent(new Event(str)) })  
        else 
            this.get().dispatchEvent(new Event(str));
    }







    each(f) {
        for(let i = 0; i < this.size(); i++) { 
            f(new JSFeatures([this.get(i)]), i)
        }
    }
    every(f) {
        for (let i = 0; i < this.size(); i++) 
            f(this.get(i), i)
    }
    toJSF() {
            let arr = []
            this.each((el, i) => { 
                arr[i] = el;
            })
            return new JSFeatures(arr);
    }
    // private
    #Exeption(text) {
        throw 'JSF: ' + text;
    }

    #CSS_Single(e, keys, styles) {
        let cssText = e.style.cssText;
        for (let i = 0; i < keys.length; i++) {
            if (cssText.indexOf(keys[i]) > -1) { 
                cssText = cssText.replace(keys[i], '&%%');
                cssText = cssText.replace(/&%%[^;]+/g, `${keys[i]}: ${styles[i]}`);
            }
            else { 
                cssText += `${keys[i]}: ${styles[i]};`;
            }
        } 
        e.style.cssText = cssText;
    }
    #Animate_Single(e, duration, f) {
        let saved = '';
        let cssText = e.style.cssText;
        if (cssText.indexOf('transition') > -1)
            saved = cssText.split(/(transition:\s*[a-zA-Z0-9-\s.,]+;)/g)[1];
        
        setTimeout(() => {
            if (f) f() 
            e.style.cssText = e.style.cssText.replace(/transition:\s*[a-zA-Z0-9-\s.,]+;/g, saved);
        }, duration + 1);
    }
    #Scroll_Single(e, startTime, y, duration) {
        let startScroll = e.scrollTop < 0 ? 0 : e.scrollTop;
        let delta = (y - startScroll);
        let timer = setInterval(() => {
            let current = new Date().getTime() - startTime;
            e.scrollTop = current/duration * delta;
            if (current >= duration) 
                clearInterval(timer)
        }, 1)
    }

}
