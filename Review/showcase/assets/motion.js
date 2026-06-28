/* RKM Showcase motion engine — GSAP + ScrollTrigger + Lenis + SplitType
   Graceful + accessible: if libs fail or reduced-motion is set, content stays fully visible. */
(function(){
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hasGSAP = !!window.gsap;
  if(!hasGSAP || reduce){ document.documentElement.classList.remove('motion'); return; } // show all, no motion
  document.documentElement.classList.add('motion');

  gsap.registerPlugin(ScrollTrigger);

  // Lenis smooth scroll (the "buttery" feel of the reference)
  var lenis=null;
  if(window.Lenis){
    lenis=new Lenis({duration:1.1, easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t));}, smoothWheel:true});
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(function(t){ lenis.raf(t*1000); });
    gsap.ticker.lagSmoothing(0);
  }

  window.addEventListener('load', function(){

    // Headline word reveal (SplitType) — staggered rise
    document.querySelectorAll('[data-split]').forEach(function(el){
      var words = el;
      if(window.SplitType){ words=new SplitType(el,{types:'words'}).words; }
      gsap.set(el,{opacity:1});
      gsap.from(window.SplitType?words:[el], {yPercent:115, opacity:0, duration:.9, ease:'power3.out', stagger:.06,
        scrollTrigger:{trigger:el, start:'top 88%'}});
    });

    // Generic reveals
    gsap.utils.toArray('.reveal').forEach(function(el){
      gsap.to(el,{opacity:1,y:0,duration:.9,ease:'power3.out',
        scrollTrigger:{trigger:el,start:'top 86%'},delay:(+el.dataset.delay||0)});
    });
    gsap.utils.toArray('.reveal-l').forEach(function(el){
      gsap.to(el,{opacity:1,x:0,duration:.9,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 86%'}});
    });
    // Clip reveal (image/headline curtain)
    gsap.utils.toArray('.clip').forEach(function(el){
      gsap.to(el,{clipPath:'inset(0 0 0% 0)',duration:1.1,ease:'power4.out',scrollTrigger:{trigger:el,start:'top 84%'}});
    });

    // Count-up numbers
    gsap.utils.toArray('[data-count]').forEach(function(el){
      var to=+el.dataset.count, pre=el.dataset.pre||'', suf=el.dataset.suf||'', o={v:0};
      ScrollTrigger.create({trigger:el,start:'top 85%',once:true,onEnter:function(){
        gsap.to(o,{v:to,duration:1.6,ease:'power2.out',onUpdate:function(){
          el.textContent=pre+Math.round(o.v).toLocaleString('en-IN')+suf;}});
      }});
    });

    // Progress bars
    gsap.utils.toArray('.track i[data-w]').forEach(function(el){
      gsap.to(el,{width:el.dataset.w,duration:1.5,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 90%'}});
    });

    // Hero parallax (image drifts slower than scroll)
    gsap.utils.toArray('[data-parallax]').forEach(function(el){
      gsap.to(el,{yPercent:(+el.dataset.parallax||12),ease:'none',
        scrollTrigger:{trigger:el.closest('section,.hero')||el,start:'top top',end:'bottom top',scrub:true}});
    });

    // Optional pinned scroll-counter (reference "100" feeling) — element with [data-scrollcount]
    document.querySelectorAll('[data-scrollcount]').forEach(function(el){
      var host=el.closest('[data-scrollcount-host]')||el.parentElement, o={v:0};
      ScrollTrigger.create({trigger:host,start:'top top',end:'+=120%',pin:host.querySelector('[data-pin]')||false,scrub:true,
        onUpdate:function(self){ el.textContent=Math.round(self.progress*100); }});
    });

    ScrollTrigger.refresh();
  });
})();
