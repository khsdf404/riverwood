const log = console.log.bind(document);
// jquery-like-funcs
class JSFeatures {
    e; deepthElem;

    constructor(elem = null) {
        if (elem == null) return;
        this.deepthElem = document;
        if (typeof(elem) != 'string') {
            this.e = elem;
            return;
        }
        while (elem.indexOf(' ') > -1) {  
            this.e = this.find(elem).e
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
        this.e = elem; 
    } 
    get(index = 0) {
        if (typeof(index) == 'number') return this.e && this.e[index]|| null;
        let childGroup = []
        for(let i = 0; i < index.length; i++)
            childGroup.push(this.e[index[i]]);
        return childGroup;
    } 
    find(elem, deepth = false) {
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
            let nextDeepthParent = this.find(elem.replace(/\s+[\S\s]+/g, ''));
            elem = elem.replace(/^\S+\s+/g, '')
            for(let i = 0; i < nextDeepthParent.size(); i++) {
                let p = nextDeepthParent.find(i);
                let childArr = p.find(elem, 1);
                for (let i = 0; i < childArr.length; i++)
                    a.push(childArr[i]); 
            }
            if (!deepth)
                return new JSFeatures(a);
            else  
                return a;
        }
        if (elem.indexOf('#') > -1) 
            elem = [document.getElementById(elem.replace('#', ''))];
        else if (elem.indexOf('.') > -1) 
            elem = this.deepthElem.getElementsByClassName(elem.replace('.', ''));
        else {
            elem = this.deepthElem.getElementsByTagName(elem); 
        }
        if (!deepth)
            return new JSFeatures(elem);
        else  
            return elem; 
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
        log(output)
        excluded.e = output;
        return excluded;
    }

    


    empty() { 
        while(this.get().firstElementChild) 
            this.get().firstElementChild.remove(); 
        return this;
    }
    css(obj) {
        // obj is key-value css;
        for (let j = 0; j < this.size(); j++) {
            let keys = Object.keys(obj);
            let styles =  Object.values(obj);
            let cssText = this.get(j).style.cssText;
            for (let i = 0; i < keys.length; i++) {
                if (cssText.indexOf(keys[i]) > -1) { 
                    cssText = cssText.replace(keys[i], '%');
                    cssText = cssText.replace(/%[^;]+/g, `${keys[i]}: ${styles[i]}`);
                }
                else { 
                    cssText += `${keys[i]}: ${styles[i]};`;
                }
                
            }
            this.get(j).style.cssText = cssText;
        }
        return this;
    }
    animate(obj, transition, f = null) {
        let saved = ''; let cssText = this.get().style.cssText;
        if (cssText.indexOf('transition') > -1) { 
            saved = cssText.split(/(transition:\s*[a-zA-Z0-9-\s.,]+;)/g)[1];
        }
        transition = typeof(transition) == 'number' ? 
            `all ${transition}ms ease 0s` : 
            transition; 
        obj['transition'] = transition;
        this.css(obj) 

        

        let delay = obj['transition'].split(/[a-zA-Z -,]+/); // FIXME 
        delay = parseFloat(delay[0]) || parseFloat(delay[1])
        setTimeout(() => {
            if (f) f() 
            this.get().style.cssText = this.get().style.cssText.replace(/transition:\s*[a-zA-Z0-9-\s.,]+;/g, saved);
        }, delay);
        
           
        return this;
    }
    scroll(y = null, duration = 0) {
        if (y == null) return this.get().scrollTop;
        let startScroll = this.get().scrollTop < 0 ? 0 : this.get().scrollTop;
        let delta = (y - startScroll); 
        let start = new Date().getTime();
        let timer = setInterval(() => {
            let current = new Date().getTime() - start;
            this.get().scrollTop = current/duration * delta;
            if (current >= duration) 
                clearInterval(timer)
        }, 1)
    }
    // FIXME
    // doesnt work with calling more than 1 time during one duration
    scrollBy(delta, duration = 0) { 
        clearInterval(this.scrollTimer);
        this.get().scrollTop = 
            this.reserveScroll || 
            this.get().scrollTop;
        let start = new Date().getTime();
        let startScroll = this.get().scrollTop % this.get().scrollHeight;
        this.reserveScroll = startScroll + delta;
        this.scrollTimer = setInterval(() => {
            let current = new Date().getTime() - start;
            this.get().scrollTop = startScroll + (delta * current/duration);
            if (current >= duration) {
                clearInterval(this.scrollTimer)
                this.get().scrollTop = startScroll + delta;
                delete this.scrollTimer;
                delete this.reserveScroll;
            }
        }, 1) 
    }




    
    addClass(classname) { 
        for (let i = 0; i < this.e.length; i++) 
            this.get(i).classList.add(classname); 
        return this;
    }
    removeClass(classname = null) { 
        for (let i = 0; i < this.e.length; i++) {
            if (classname)
                this.get(i).classList.remove(classname); 
            else 
                this.get(i).className = ' ';
        }
        return this;
    }
    toggleClass(classname) {
        for (let i = 0; i < this.size(); i++) {
            if (this.get(i).classList.contains(classname))
                this.e[i].classList.remove(classname);
            else
                this.e[i].classList.add(classname);
        }
        return this;
    }
    hasClass(classname) { 
        return this.get().classList.contains(classname);
    }
    

    // getters & setters
    text(text = null) {
        if (text == null) return this.get().innerText;
        this.get().innerText = text;
        return this;
    }
    value(value) {
        if (value == null) return this.get().value;
        this.get().value = value;
        return this;
    }
    html(text = null) {
        if (text == null)
            return this.get().innerHTML;
        let html = '';
        this.every((e) => {
            html += e.innerHTML();
        }) 
        this.get().innerHTML = html;
        return this;
    }
    outerHtml(text = null) {
        if (text == null)
            return this.get().outerHTML;
        let html = '';
        this.every((e) => {
            html += e.outerHTML();
        }) 
        this.get().outerHTML = html;
        return this;
    }
    attr() {
        return this.get().getAttribute(attr);
    }
    attr(attr, value) {
        this.get().setAttribute(attr, value);
        return this;
    }
    id() {
        return this.get().id 
    }
    index(obj) {
        if (obj.e) // Convert to DOM
            obj = obj.get()
        for (let i = 0; i < this.size(); i++) 
                if (obj == this.get(i))
                    return i;
    }
    classes() { 
        return this.get().classList
    }
    rect() {
        return this.get().getBoundingClientRect();
    }
    parent(str = null) {
        if (!str) return new JSFeatures([this.get().parentNode]);        
        return new JSFeatures([this.get().closest(str)]);
    }
    size() {
        return this.e && this.e.length || 0;
    }





     


    // only 1-level-elements (without childs)
    append(str) {
        // str = `
            // <span style="
            //         left: 10px; 
            //         top: 16px;
            //         animation: StarsBlinking 4s linear infinite
            // " class="superclass"> 
            // </span>
        //     <span style="
        //             left: 10px; 
        //             top: 16px;
        //             animation: StarsBlinking 4s linear infinite
        //     " class="superclass">
        //     </span>
        //     <img />
        // ` 
        let objs = [];
        str = str.replace(/\t/g, '').replace(/\n/g, '').replace(/\s+/g, ' ');
        let tags = str.split(/(<[a-zA-Z1-6]+\s*)/g); 
        for (let i = 1; i < tags.length; i+= 2) {
            let elemType =  tags[i].replace(/[\s<]/g, '');
            let attrs =     tags[i+1].split(/"/g);
            let text =      attrs[attrs.length - 1].replace(/(>)|(<\/[\S\s]+$)/g, '');

            let elem = document.createElement(elemType);
            for(let i = 0; i < attrs.length - 1; i += 2) {
                elem.setAttribute(
                    attrs[i].replace(/[\s=]+/g, ''), 
                    attrs[i + 1]
                ) 
            }
            elem.innerText = text;
            objs.push(elem)
            this.get().append(elem);
        }

        return new JSFeatures(objs)
    }
    // fixme try it
    append_OLD2(obj) {
        if (typeof(obj) != 'string') obj = obj.outerHTML();
        else this.get().innerHTML = this.get().innerHTML + obj;
        return this;
    }
    appendObj(obj) {
        for(let i = 0; i < obj.e.length; i++) {
            this.get().append(obj.get(i));
        }
        return this;
    }
    create(str) { 
        let objs = [];
        str = str.replace(/\t/g, '').replace(/\n/g, '').replace(/\s+/g, ' ');
        let tags = str.split(/(<[a-zA-Z1-6]+\s*)/g); 
        for (let i = 1; i < tags.length; i+= 2) {
            let elemType =  tags[i].replace(/[\s<]/g, '');
            let attrs =     tags[i+1].split(/"/g);
         let text =      attrs[attrs.length - 1].replace(/(>)|<\/[\s\S]+>[\s\S]*$/g, '');
        //    let text =      attrs[attrs.length - 1].replace(/(>)|(<\/\S+$)/g, '');
            
            let elem = document.createElement(elemType);
            for(let i = 0; i < attrs.length - 1; i += 2) {
                elem.setAttribute(
                    attrs[i].replace(/[\s=]+/g, ''), 
                    attrs[i + 1]
                ) 
            }
            elem.innerText = text;
            objs.push(elem) 
        }

        return new JSFeatures(objs)
    }
    



    fadeIn(speed, f) {
        this.savedDisplay = this.savedDisplay == 'none' ? 'initial' : this.savedDisplay;
        this.css({'display': this.savedDisplay || 'initial'})
        delete this.savedDisplay;
        this.animate({
            'opacity': '1'
        }, speed, f)
    }
    fadeOut(speed, f) {
        this.animate({
            'opacity': '0'
        }, speed, f)
        setTimeout(() => { 
            this.savedDisplay = window.getComputedStyle(this.get()).display;
            this.css({'display': 'none'})
        }, speed);
    }

    
    // EVENTS
    onEvent(type, f) {
        for (let i = 0; i < this.e.length; i++)
            this.e[i].addEventListener(type, e => { f(new JSFeatures([this.e[i]]), e) });
    }
    onClick(f) {
        this.onEvent('click', f)
    }
    trigger(str) {
        this.every((e, i) => {
            log(str)
            e.dispatchEvent(new Event(str));
        })  
    }




    each(f) {
        for(let i = 0; i < this.size(); i++) { 
            f(new JSFeatures([this.get(i)]), i)
        }
    } 
    // private
    every(f) {
        for (let i = 0; i < this.size(); i++) 
            f(this.get(i), i)
    }
}

const staticEx = new JSFeatures();
const $js = (str = null) => {
    if (str == null) return staticEx;
    return new JSFeatures(str);
}; 