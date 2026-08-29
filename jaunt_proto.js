  /* ══════════════════════════════════════════
     SUPABASE SETUP
  ══════════════════════════════════════════ */
  const SUPABASE_URL = 'https://djgumlhslkzqhcthadhx.supabase.co';
  const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqZ3VtbGhzbGt6cWhjdGhhZGh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc5NDQ1NDgsImV4cCI6MjEwMzUyMDU0OH0.IdkGj5fhXibig0tB38zGkvKwyky_UP2VbEckjEZ5MxY';
  let db = null;
  if(typeof supabase !== 'undefined' && supabase.createClient){
    try {
      db = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } catch(e){
      console.error('Could not create the Supabase client — app continues without live data', e);
    }
  } else {
    console.warn('Supabase library did not load (blocked, offline, or slow network) — app continues on local/hardcoded data only');
  }
/* ---------------- ICONS ---------------- */
const ICONS = {
  exploration: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M3 19L9 8l4 6 2-3 6 8H3z"/></svg>',
  adrenaline: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg>',
  leisure: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="9" r="3.4"/><path d="M12 3.5v1.3M12 14.2v1.3M18.5 9h-1.3M6.8 9H5.5M16.5 4.5l-.9.9M8.4 13.1l-.9.9M16.5 13.5l-.9-.9M8.4 4.9l-.9-.9"/><path d="M2 19c2-2 4-2 6 0s4 2 6 0 4-2 6 0"/></svg>',
  culture: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M4 21h16M5 21V9M9 21V9M15 21V9M19 21V9M3 9l9-5 9 5"/></svg>',
  nature: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3C7 6 5 10 5 14a7 7 0 0014 0c0-4-2-8-7-11z"/><path d="M12 21V11"/></svg>'
};
const COLORS = { exploration:'var(--trail)', adrenaline:'var(--signal)', leisure:'var(--leisure)', culture:'var(--culture)', nature:'var(--nature)' };
const LABELS = { exploration:'Exploration', adrenaline:'Adrenaline', leisure:'Leisure', culture:'Culture', nature:'Nature' };
const SRC_CLASS = { Viator:'src-viator', GetYourGuide:'src-gyg', You:'src-user' };

/* ---- Per-activity illustrations (hand-drawn line art, one per seeded activity) ---- */
const ITEM_ART = {
  e1: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M10 50 14 20 18 50Z"/><path d="M22 50 28 12 34 50Z"/><path d="M38 50 43 24 48 50Z"/><circle cx="28" cy="30" r="1.4" fill="currentColor" stroke="none"/><circle cx="14" cy="35" r="1.2" fill="currentColor" stroke="none"/><circle cx="43" cy="33" r="1.2" fill="currentColor" stroke="none"/></svg>',
  e3: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="30" cy="26" r="8"/><path d="M6 46 18 24 26 36 34 18 48 46 54 40"/></svg>',
  n1: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M8 18c6-3 12-3 18 0s12 3 18 0s10-3 10-3"/><path d="M28 18v10"/><path d="M6 34c6-3 12-3 18 0s12 3 18 0s10-3 12-3"/><path d="M40 34v10"/><path d="M4 50c6-3 12-3 18 0s12 3 18 0s10-3 14-3"/></svg>',
  n2: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="44" cy="16" r="6"/><path d="M6 46h48"/><path d="M20 46V28"/><path d="M20 30c-6-2-10-8-8-8s4 4 8 6c2-6 8-8 8-6s-4 4-8 8z"/></svg>',
  n3: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M30 46c-4-14 0-28 4-32c2 6 0 12-2 16c6-4 10-2 12 2c-6 0-10 4-12 8c4 0 8 2 10 6c-6 2-10 0-12-4v4z"/><path d="M6 48c6-4 12-4 18 0s12 4 18 0s10-4 12-4"/></svg>',
  a1: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 14h20"/><path d="M18 14v6"/><circle cx="34" cy="26" r="3"/><path d="M34 29v10M34 32l-6 4M34 32l6 4M34 39l-4 6M34 39l4 6"/></svg>',
  a2: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 20 54 40"/><circle cx="28" cy="28" r="2.5"/><path d="M28 30.5v6M28 33l-4 3M28 33l4 3M28 36l-3 5M28 36l3 5"/><path d="M6 20v26M54 40v10"/></svg>',
  l1: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M6 42c8-4 12 4 20 0s12 4 20 0s6-2 8-2"/><path d="M20 34c-2-4 2-6 0-10M32 30c-2-4 2-6 0-10M42 34c-2-4 2-6 0-10"/></svg>',
  l2: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="44" cy="18" r="6"/><path d="M24 44V18l14 14z"/><path d="M8 44h44"/><path d="M6 50c6-3 12-3 18 0s12 3 18 0s6-2 12-2"/></svg>',
  c1: '<svg viewBox="0 0 60 60" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 30h26l-3 12a4 4 0 01-4 3H21a4 4 0 01-4-3z"/><path d="M40 32c4 0 6 3 6 6s-3 6-7 5"/><path d="M22 24c-1-3 2-5 0-8M30 24c-1-3 2-5 0-8"/></svg>'
};
function itemArt(item, cat){
  return (item && ITEM_ART[item.id]) || ICONS[cat];
}

const FRIENDS = [
  {id:'f1', handle:'@maya_t', name:'Maya Torres', public:true, wantToTryIds:['w2','r2']},
  {id:'f2', handle:'@jonasw', name:'Jonas Weber', public:true, wantToTryIds:['w3']},
  {id:'f3', handle:'@sofia.k', name:'Sofia Kappas', public:false, wantToTryIds:['w4','w1']},
  {id:'f4', handle:'@alex.p', name:'Alex Park', public:true, wantToTryIds:['r3']},
  {id:'f5', handle:'@nina.r', name:'Nina Rodrigues', public:true, wantToTryIds:['w1','w5']}
];
let myName = null;
function friendDisplayName(handle){
  if(handle === '@you') return myName || 'You';
  const f = FRIENDS.find(x => x.handle === handle);
  return f ? f.name : handle;
}
let youFollowing = new Set(FRIENDS.map(f => f.id)); // following all mock friends by default
let mockFollowerCount = 142;
let myProfilePublic = true;
let offlineMode = false;
let locationPermission = null; // null = not asked, 'granted', 'denied'
let userCoords = null;
function openLocationPermissionPrompt(){
  document.getElementById('quiz-modal').innerHTML = `
    <div style="text-align:center; padding:10px 4px 4px;">
      <div class="notif-icon" style="width:52px; height:52px; margin:0 auto 14px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      </div>
      <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:6px;">Share your location?</h3>
      <p class="caption" style="margin-bottom:16px;">See real distances to activities near you instead of typing a place. You can turn this off anytime in Standing.</p>
    </div>
    <button class="btn btn-brass btn-block" id="loc-perm-yes">Allow location access</button>
    <button class="btn btn-outline btn-block" id="loc-perm-no" style="margin-top:8px;">Not now</button>
  `;
  document.getElementById('quiz-overlay').classList.add('active');
  document.getElementById('loc-perm-no').addEventListener('click', () => {
    locationPermission = 'denied';
    document.getElementById('quiz-overlay').classList.remove('active');
  });
  document.getElementById('loc-perm-yes').addEventListener('click', () => {
    document.getElementById('quiz-overlay').classList.remove('active');
    if(!navigator.geolocation){
      locationPermission = 'denied';
      toast('Location isn\'t available in this browser', false);
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        userCoords = { lat: pos.coords.latitude, lon: pos.coords.longitude };
        locationPermission = 'granted';
        renderNearYou();
        toast('Using your current location');
      },
      () => {
        locationPermission = 'denied';
        toast('Location access denied — search for a place instead', false);
        renderNearYou();
      }
    );
  });
}
function requestLocationPermission(){
  openLocationPermissionPrompt();
}
function updateOfflineUI(){
  const banner = document.getElementById('offline-banner');
  banner.style.display = offlineMode ? 'flex' : 'none';
  banner.innerHTML = offlineMode
    ? `<span>You're offline — showing downloaded trips and your saved lists only.</span><button id="go-online-btn">Go online</button>`
    : '';
  if(offlineMode){
    document.getElementById('go-online-btn').addEventListener('click', () => { offlineMode = false; renderAll(); });
  }
  const searchInput = document.getElementById('search-input');
  const nearYouInput = document.getElementById('near-you-input');
  searchInput.disabled = offlineMode;
  searchInput.placeholder = offlineMode ? 'Search unavailable offline' : 'Search activities, places, or people...';
  nearYouInput.disabled = offlineMode;
}
function friendAvatarStack(ids){
  if(!ids || !ids.length) return '';
  return `<div class="avatar-stack">${ids.map(fid=>{
    const f = FRIENDS.find(x=>x.id===fid);
    return f ? `<span class="mini-avatar" title="${f.handle}">${f.handle[1].toUpperCase()}</span>` : '';
  }).join('')}</div>`;
}

/* ---- Public profile viewing ---- */
function friendBeenItems(handle){
  return feedPosts.filter(p => p.friend === handle).map(p => ({
    id: p.itemId, name: p.itemName, loc: p.loc, category: p.category, score: p.score, tier: p.tier
  }));
}
let viewingOtherProfile = null;
let otherProfileTab = 'been';
let otherProfileCategory = 'all';
function openFollowList(kind, viewedFriend){
  let people, isReal;
  if(!viewedFriend){
    // your own profile
    if(kind === 'following'){
      people = FRIENDS.filter(f => youFollowing.has(f.id));
      isReal = true;
    } else {
      people = FRIENDS; // no real reverse follow-graph exists yet — see caption below
      isReal = false;
    }
  } else {
    // someone else's profile — we don't track their real follow graph either
    people = FRIENDS.filter(f => f.id !== viewedFriend.id);
    isReal = false;
  }
  const title = kind === 'following' ? 'Following' : 'Followers';
  document.getElementById('newlist-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:4px;">${title}</h3>
    ${!isReal ? `<p class="caption" style="text-align:left; margin-bottom:10px;">Illustrative — there's no real multi-user follow graph in this prototype yet, so this list is a stand-in.</p>` : ''}
    ${people.length ? people.map(p => `
      <div class="rank-row" data-followperson="${p.id}" style="cursor:pointer;">
        <span class="mini-avatar" style="width:32px; height:32px; font-size:11px;">${p.name[0].toUpperCase()}</span>
        <div class="rank-info"><div class="rank-name">${p.name}</div><div class="rank-loc">${p.handle}</div></div>
      </div>`).join('') : `<p class="caption" style="text-align:left;">Nobody here yet.</p>`}
    <button class="btn btn-outline btn-block" id="followlist-close" style="margin-top:10px;">Close</button>
  `;
  document.getElementById('newlist-overlay').classList.add('active');
  document.querySelectorAll('[data-followperson]').forEach(row => row.addEventListener('click', () => {
    const person = FRIENDS.find(f => f.id === row.dataset.followperson);
    document.getElementById('newlist-overlay').classList.remove('active');
    if(person) openPublicProfile(person);
  }));
  document.getElementById('followlist-close').addEventListener('click', () => document.getElementById('newlist-overlay').classList.remove('active'));
}
function openPublicProfile(friend){
  viewingOtherProfile = friend;
  otherProfileTab = 'been';
  otherProfileCategory = 'all';
  switchToScreen('profile');
  renderAll();
}
function renderOtherProfile(friend){
  document.getElementById('profile-pills').innerHTML = '';
  document.getElementById('first-finder-showcase').innerHTML = '';
  const content = document.getElementById('profile-content');

  if(!friend.public){
    document.getElementById('profile-header').innerHTML = `
      <button class="sec-label-action" id="back-to-my-profile" style="margin-bottom:10px;">← Back to your profile</button>`;
    document.getElementById('taste-map').innerHTML = '';
    content.innerHTML = `
      <div class="empty" style="padding:36px 16px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
        <p style="color:var(--ink); font-weight:600;">${friend.name}'s profile is private</p>
        <p>Only their approved friends can see their travel activity.</p>
      </div>`;
    document.getElementById('back-to-my-profile').addEventListener('click', () => { viewingOtherProfile = null; renderProfileTab(); });
    return;
  }

  const been = friendBeenItems(friend.handle);
  const countries = new Set(been.map(i => i.loc.split(',').pop().trim()));
  const wantItems = (friend.wantToTryIds || []).map(id => findAnyItemById(id)).filter(Boolean)
    .sort((a,b) => (b.recommendedScore ?? b.avgScore ?? 0) - (a.recommendedScore ?? a.avgScore ?? 0));
  const isFollowing = youFollowing.has(friend.id);

  document.getElementById('profile-header').innerHTML = `
    <button class="sec-label-action" id="back-to-my-profile" style="margin-bottom:10px;">← Back to your profile</button>
    <div class="profile-head">
      <span class="mini-avatar" style="width:54px; height:54px; font-size:18px;">${friend.name[0].toUpperCase()}</span>
      <div style="flex:1;">
        <div class="profile-name">${friend.name}<span class="visibility-pill public" style="margin-left:6px;">Public</span></div>
        <div class="profile-rank">${friend.handle} · ${been.length} places logged · ${countries.size} countries</div>
        <div style="display:flex; gap:10px; margin-top:3px; font-size:11.5px; color:var(--slate);">
          <button class="follow-count-btn" id="other-followers-btn"><b style="color:var(--ink);">${friend.followerCount || 90 + friend.id.charCodeAt(0)}</b> Followers</button>
          <button class="follow-count-btn" id="other-following-btn"><b style="color:var(--ink);">${friend.followingCount || 40 + friend.id.charCodeAt(0)}</b> Following</button>
        </div>
      </div>
    </div>
    <div style="display:flex; gap:8px; margin-top:12px;">
      <button class="btn ${isFollowing ? 'btn-outline' : 'btn-brass'}" style="flex:1;" id="follow-toggle-btn">${isFollowing ? 'Following' : 'Follow'}</button>
      <button class="btn btn-outline" style="flex:1;" id="message-friend-btn">Message</button>
    </div>`;
  document.getElementById('other-followers-btn').addEventListener('click', () => openFollowList('followers', friend));
  document.getElementById('other-following-btn').addEventListener('click', () => openFollowList('following', friend));

  document.getElementById('taste-map').innerHTML = renderWorldMap(computeFriendPinData(friend)) + renderMapCaption(computeFriendPinData(friend));

  const tabs = [{id:'been', label:'Been'}, {id:'want', label:'Want to try'}];
  document.getElementById('profile-pills').innerHTML = tabs.map(t => `<button class="pill ${otherProfileTab===t.id?'active':''}" data-otherpill="${t.id}">${t.label}</button>`).join('');

  if(otherProfileTab === 'been'){
    const theirSpecialistCats = Object.keys(LABELS).filter(cat => been.filter(i => i.category === cat).length >= SPECIALIST_THRESHOLD);
    const filteredBeen = otherProfileCategory === 'all' ? been : been.filter(i => i.category === otherProfileCategory);
    content.innerHTML = `
      <div class="stamps" id="other-profile-cat-stamps" style="margin-bottom:12px;"></div>
      ${theirSpecialistCats.length ? `<p class="caption" style="text-align:left; margin-bottom:10px;">${theirSpecialistCats.map(c => `${SPECIALIST_NAMES[c]} badge`).join(' · ')}</p>` : ''}
      ${filteredBeen.length ? filteredBeen.map(i => `
        <div class="public-been-row">
          ${i.score != null ? scoreChip(i.score, i.tier, true) : ''}
          <div style="flex:1;">
            <div class="rank-name">${i.name}</div>
            <div class="rank-loc">${i.loc}</div>
          </div>
        </div>`).join('') : `<p class="caption" style="text-align:left;">Nothing logged ${otherProfileCategory==='all'?'yet':'in ' + LABELS[otherProfileCategory]}.</p>`}
    `;
    const stampsEl = document.getElementById('other-profile-cat-stamps');
    const presentCats = ['all', ...new Set(been.map(i => i.category))];
    stampsEl.innerHTML = presentCats.map(cat => cat === 'all'
      ? `<div class="stamp" style="--c:var(--slate);" data-othercat="all"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/></svg><div class="stamp-label">All</div></div>`
      : `<div class="stamp" style="--c:${COLORS[cat]}" data-othercat="${cat}">${ICONS[cat]}<div class="stamp-label">${LABELS[cat]}</div></div>`
    ).join('');
    stampsEl.querySelectorAll('[data-othercat]').forEach(s => {
      if(s.dataset.othercat === otherProfileCategory) s.classList.add('selected');
      s.addEventListener('click', () => { otherProfileCategory = s.dataset.othercat; renderOtherProfile(friend); });
    });
  } else {
    content.innerHTML = wantItems.length ? wantItems.map(i => `
      <div class="public-been-row" data-open-id="${i.id}" style="cursor:pointer;">
        <div style="width:28px;height:28px;border-radius:7px;flex-shrink:0;${mediaStyle(i.category, i.photo)}"></div>
        <div style="flex:1;">
          <div class="rank-name">${i.name}</div>
          <div class="rank-loc">${i.loc}</div>
        </div>
      </div>`).join('') : `<p class="caption" style="text-align:left;">Nothing bookmarked yet.</p>`;
    wireDetailClicks(content, wantItems);
  }

  document.getElementById('back-to-my-profile').addEventListener('click', () => { viewingOtherProfile = null; renderProfileTab(); });
  document.querySelectorAll('[data-otherpill]').forEach(b => b.addEventListener('click', () => {
    otherProfileTab = b.dataset.otherpill;
    renderOtherProfile(friend);
  }));
  document.getElementById('follow-toggle-btn').addEventListener('click', () => {
    if(youFollowing.has(friend.id)){ youFollowing.delete(friend.id); toast(`Unfollowed ${friend.name}`); }
    else { youFollowing.add(friend.id); toast(`Following ${friend.name}`); }
    renderOtherProfile(friend);
  });
  document.getElementById('message-friend-btn').addEventListener('click', () => openThreadWithHandle(friend.handle));
}

/* ---------------- MOCK DATA ---------------- */
let ranked = {
  exploration: [
    {id:'e1', name:'Cappadocia Cave Village Walk', loc:'Cappadocia, Türkiye', blurb:'Wander sunken stone villages carved into volcanic rock.', source:'GetYourGuide', tier:'liked', score:8.4, visits:1, lastVisited:'Mar 2026', price:2, tags:['Off the beaten path','Best at sunrise']},
    {id:'e3', name:'Sunrise Trek to Sarangkot', loc:'Pokhara, Nepal', blurb:'Dawn views over the Annapurna range from a quiet ridge.', source:'Viator', tier:'liked', score:7.7, visits:1, lastVisited:'Nov 2025', price:1, tags:['Physically demanding','Best at sunrise']}
  ],
  nature: [
    {id:'n1', name:'Plitvice Lakes Walking Trail', loc:'Plitvice, Croatia', blurb:'Wooden boardwalks over sixteen terraced turquoise lakes.', source:'Viator', tier:'liked', score:9.3, visits:2, lastVisited:'Jun 2026', price:2, tags:['Family-friendly','Easy walking']},
    {id:'n2', name:'Serengeti Sunrise Game Drive', loc:'Serengeti, Tanzania', blurb:'Open-vehicle safari timed to the plains waking up.', source:'GetYourGuide', tier:'liked', score:8.2, visits:1, lastVisited:'Feb 2025', price:4, tags:['Bucket list','Guided only']},
    {id:'n3', name:'Kaikoura Whale Watching', loc:'Kaikoura, New Zealand', blurb:'Sperm whales year-round off a dramatic coastal shelf.', source:'Viator', tier:'fine', score:5.7, visits:1, lastVisited:'Jan 2026', price:3, tags:['Family-friendly','Seasonal']}
  ],
  adrenaline: [
    {id:'a1', name:'Nevis Bungy Jump', loc:'Queenstown, New Zealand', blurb:'134m free fall over the Nevis River gorge.', source:'GetYourGuide', tier:'liked', score:8.5, visits:2, lastVisited:'Jan 2026', price:4, tags:['Bucket list','Not for the faint of heart']},
    {id:'a2', name:'Zip-line Canopy Tour', loc:'Monteverde, Costa Rica', blurb:'Thirteen platforms strung through cloud-forest canopy.', source:'Viator', tier:'fine', score:5.1, visits:1, lastVisited:'Aug 2025', price:2, tags:['Family-friendly','Instagrammable']}
  ],
  leisure: [
    {id:'l1', name:'Blue Lagoon Soak', loc:'Grindavík, Iceland', blurb:'Geothermal, silica-milky water against black lava fields.', source:'GetYourGuide', tier:'liked', score:8.4, visits:1, lastVisited:'Dec 2025', price:3, tags:['Sunset spot','Relaxing']},
    {id:'l2', name:'Sunset Catamaran Sail', loc:'Santorini, Greece', blurb:'Caldera views with a swim stop and a slow sunset.', source:'Viator', tier:'liked', score:7.2, visits:3, lastVisited:'Jul 2026', price:3, tags:['Sunset spot','Date-worthy']}
  ],
  culture: [
    {id:'c1', name:'Kyoto Tea Ceremony', loc:'Kyoto, Japan', blurb:'A quiet, formal ritual in a two-hundred-year-old teahouse.', source:'GetYourGuide', tier:'liked', score:9.2, visits:1, lastVisited:'Apr 2026', price:2, tags:['Off the beaten path','Quiet & reflective']}
  ]
};

/* ---- Tiered scoring (Beli-style): pick a tier, compare only within it, position maps to a 0-10 score ---- */
const TIERS_META = {
  liked:    {label:'I liked it', range:[6.7, 10.0], color:'var(--trail)'},
  fine:     {label:'It was fine', range:[4.0, 6.6], color:'var(--brass)'},
  disliked: {label:"I didn't like it", range:[0, 3.9], color:'var(--signal)'}
};
function round1(n){ return Math.round(n * 10) / 10; }
function formatLoggedDate(isoDate){
  if(!isoDate) return 'today';
  const d = new Date(isoDate + 'T00:00:00');
  const today = new Date();
  if(d.toDateString() === today.toDateString()) return 'today';
  return d.toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'});
}
function computeScore(tier, position, total){
  const [tmin, tmax] = TIERS_META[tier].range;
  if(total === 0) return round1(tmax - 0.2);
  const frac = position / total;
  return round1(tmax - frac * (tmax - tmin));
}
function recomputeTierScores(category, tier){
  const list = ranked[category];
  const tierItems = list.filter(i => i.tier === tier);
  const total = tierItems.length;
  tierItems.forEach((it, pos) => { it.score = computeScore(tier, pos, total); });
}
function moveRankedItem(category, itemId, direction){
  const list = ranked[category];
  const idx = list.findIndex(i => i.id === itemId);
  if(idx === -1) return;
  const swapIdx = idx + direction;
  if(swapIdx < 0 || swapIdx >= list.length) return;
  const item = list[idx];
  const other = list[swapIdx];
  if(other.tier !== item.tier){
    toast("Can't move past the edge of its tier — try Re-rank instead", false);
    return;
  }
  [list[idx], list[swapIdx]] = [list[swapIdx], list[idx]];
  recomputeTierScores(category, item.tier);
  renderAll();
}
function insertByScore(category, item){
  const list = ranked[category];
  let idx = list.findIndex(i => i.score < item.score);
  if(idx === -1) idx = list.length;
  list.splice(idx, 0, item);
  return idx;
}
function scoreChip(score, tier, small){
  const color = tier ? TIERS_META[tier].color : 'var(--slate)';
  return `<div class="score-chip${small ? ' score-chip-sm' : ''}" style="--c:${color}">${score.toFixed(1)}</div>`;
}
const SCORE_UNLOCK_THRESHOLD = 10;
function categoryRankCount(cat){
  return (ranked[cat] || []).length;
}
function categoryScoresUnlocked(cat){
  return categoryRankCount(cat) >= SCORE_UNLOCK_THRESHOLD;
}
function scoreChipForItem(item, small){
  if(item.score == null) return '';
  const cat = item.category || findItemCategory(item.id) || currentCategory;
  if(categoryScoresUnlocked(cat)) return scoreChip(item.score, item.tier, small);
  const count = categoryRankCount(cat);
  return `<div class="score-chip-locked${small ? ' score-chip-locked-sm' : ''}" title="Scores unlock at ${SCORE_UNLOCK_THRESHOLD} ranked in ${LABELS[cat]} (${count}/${SCORE_UNLOCK_THRESHOLD})">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
  </div>`;
}
function feedScoreChip(p, small){
  // only gate posts you authored — mock friend posts represent already-established accounts
  if(p.friend === '@you' && p.category && !categoryScoresUnlocked(p.category)){
    return `<div class="score-chip-locked${small ? ' score-chip-locked-sm' : ''}" title="Scores unlock at ${SCORE_UNLOCK_THRESHOLD} ranked in ${LABELS[p.category]}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
    </div>`;
  }
  return scoreChip(p.score, p.tier, small);
}
function formatSampleCount(n){
  if(n == null) return '';
  if(n >= 1000) return (n/1000).toFixed(1).replace('.0','') + 'k';
  return String(n);
}
function priceSymbols(tier){
  if(!tier) return '';
  return '$'.repeat(tier) + '<span style="opacity:0.3;">' + '$'.repeat(4-tier) + '</span>';
}
function renderTags(item){
  if(!item.tags || !item.tags.length) return '';
  return `<div class="tag-row">${item.tags.map(t => `<span class="vibe-tag">${t}</span>`).join('')}</div>`;
}
function miniScoreRow(item){
  if(item.recommendedScore == null && item.avgScore == null) return '';
  const perks = perksUnlocked();
  const rec = item.recommendedScore != null ? `<span class="mini-score">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6 4.6 2.3 7-6.3-4.6L5.7 21l2.3-7-6-4.6h7.6z"/></svg>
      Match <span class="val">${item.recommendedScore.toFixed(1)}</span>${item.recSampleSize != null ? ` <span class="sample-count">${formatSampleCount(item.recSampleSize)}</span>` : ''}
    </span>` : '';
  let avg = '';
  if(item.avgScore != null){
    avg = perks.avgScore
      ? `<span class="mini-score">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M15 14c3 0 6 2 6 5"/></svg>
          Friends avg <span class="val">${item.avgScore.toFixed(1)}</span>${item.avgSampleCount != null ? ` <span class="sample-count">${formatSampleCount(item.avgSampleCount)}</span>` : ''}
        </span>`
      : `<span class="mini-score locked" title="Invite a friend who joins to unlock">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
          Friends avg locked
        </span>`;
  }
  return `<div class="mini-score-row">${rec}${avg}</div>`;
}

let pending = [
  {id:'p1', name:'Hidden Waterfall Hike', loc:'Big Sur, California', category:'exploration', blurb:'An unmarked trailhead leading to a private cove waterfall.', submitter:'@maya_t'},
  {id:'p2', name:'Midnight Bioluminescence Kayak', loc:'Vieques, Puerto Rico', category:'adrenaline', blurb:'Paddling through glowing plankton in Mosquito Bay after dark.', submitter:'@jonasw'},
  {id:'p3', name:'Rooftop Jazz & Wine', loc:'Lisbon, Portugal', category:'leisure', blurb:'Live jazz over the Alfama rooftops, natural wine only.', submitter:'@sofia.k'}
];

let toRank = []; // approved items waiting to be duel-ranked
let currentCategory = 'exploration';
let duelState = null;

/* ---- Standing / invites ---- */
let userPhoto = null;
let user = {
  invitesTotal: 5,
  reliability: 78
};
const INVITE_POOL = ['@theo.b', '@priya.k', '@leo.martins', '@hana.w', '@dev.k'];
let invites = []; // {id, handle, status:'sent'|'joined'}

const TIERS = [
  {name:'Wanderer', min:0},
  {name:'Trailblazer', min:35},
  {name:'Voyager', min:65},
  {name:'Globetrotter', min:90}
];
function standingScore(){
  return Math.min(100, Math.round((invites.length / user.invitesTotal) * 40 + (user.reliability / 100) * 60));
}
function currentTier(){
  const score = standingScore();
  let t = TIERS[0];
  for(const tier of TIERS){ if(score >= tier.min) t = tier; }
  return t;
}
const RES_PRIORITY_TIERS = [
  {tier:'Bronze', threshold:1},
  {tier:'Silver', threshold:2},
  {tier:'Gold', threshold:3}
];
function currentResPriorityTier(){
  if(user.reliability < 75) return null;
  const joined = invites.filter(i => i.status === 'joined').length;
  let current = null;
  for(const t of RES_PRIORITY_TIERS){
    if(joined >= t.threshold) current = t;
  }
  return current;
}
function nextResPriorityTier(){
  if(user.reliability < 75) return RES_PRIORITY_TIERS[0];
  const joined = invites.filter(i => i.status === 'joined').length;
  return RES_PRIORITY_TIERS.find(t => joined < t.threshold) || null;
}
function perksUnlocked(){
  return {
    avgScore: invites.some(i => i.status === 'joined'),
    resPriority: !!currentResPriorityTier()
  };
}
let upcoming = [
  {id:'u1', name:'Nevis Bungy Jump', loc:'Queenstown, New Zealand', date:'Sept 14', category:'adrenaline'}
];

/* ---- Want to try / Recs / Taste map data ---- */
let wantToTry = {
  exploration: [{id:'w1', name:"Tiger's Nest Monastery Hike", loc:'Paro, Bhutan', blurb:'A cliffside monastery reached by a steep switchback trail.', source:'Viator', recommendedScore:9.1, avgScore:8.4, price:3, tags:['Physically demanding','Bucket list'], recSampleSize:3100, avgSampleCount:2}],
  nature: [
    {id:'w2', name:'Northern Lights Snowmobile Tour', loc:'Tromsø, Norway', blurb:'Chase aurora activity across a frozen fjord backcountry.', source:'GetYourGuide', recommendedScore:9.4, avgScore:8.9, price:4, tags:['Bucket list','Seasonal'], recSampleSize:2800, avgSampleCount:1},
    {id:'w6', name:'Sunrise Hike Among the Hoodoos', loc:'Bryce Canyon, Utah, United States', blurb:'Amphitheaters of red-rock spires lit up at first light.', source:'Viator', recommendedScore:9.2, avgScore:8.7, price:1, tags:['Family-friendly','Best at sunrise'], recSampleSize:980, avgSampleCount:1}
  ],
  adrenaline: [{id:'w3', name:'Skydive Over Interlaken', loc:'Interlaken, Switzerland', blurb:'Freefall above turquoise lakes and the Eiger north face.', source:'Viator', recommendedScore:8.7, avgScore:8.1, price:4, tags:['Not for the faint of heart','Bucket list'], recSampleSize:1900, avgSampleCount:1}],
  leisure: [{id:'w4', name:'Onsen Ryokan Stay', loc:'Hakone, Japan', blurb:'A night in a traditional inn with private hot-spring baths.', source:'GetYourGuide', recommendedScore:8.9, avgScore:8.6, price:3, tags:['Relaxing','Date-worthy'], recSampleSize:2200, avgSampleCount:2}],
  culture: [{id:'w5', name:'Terracotta Army Tour', loc:"Xi'an, China", blurb:'Thousands of life-sized soldiers guarding an ancient tomb.', source:'Viator', recommendedScore:8.3, avgScore:7.9, price:2, tags:['Family-friendly','Off the beaten path'], recSampleSize:1600, avgSampleCount:1}]
};

let recs = {
  exploration: [{id:'r1', name:'Faroe Islands Village Hike', loc:'Faroe Islands', why:'Because you ranked Sarangkot and Cappadocia highly', source:'Viator', recommendedScore:9.0, avgScore:8.5, trendCount:298, price:2, tags:['Off the beaten path','Instagrammable'], recSampleSize:2400, avgSampleCount:2}],
  nature: [{id:'r2', name:'Torres del Paine Trek', loc:'Patagonia, Chile', why:'Popular with travelers who loved Plitvice Lakes', source:'GetYourGuide', recommendedScore:9.5, avgScore:9.0, trendCount:412, price:3, tags:['Bucket list','Physically demanding'], recSampleSize:4200, avgSampleCount:3}],
  adrenaline: [{id:'r3', name:'Whitewater Rafting the Zambezi', loc:'Victoria Falls, Zambia', why:'Popular with fans of your Nevis Bungy Jump', source:'Viator', recommendedScore:8.8, avgScore:8.3, trendCount:187, price:3, tags:['Not for the faint of heart','Bucket list'], recSampleSize:1500, avgSampleCount:2}],
  leisure: [{id:'r4', name:'Amalfi Coast Boat Day', loc:'Positano, Italy', why:'Similar to your top-rated Santorini sail', source:'GetYourGuide', recommendedScore:8.6, avgScore:8.0, trendCount:271, price:3, tags:['Sunset spot','Date-worthy'], recSampleSize:2100, avgSampleCount:2}],
  culture: [{id:'r5', name:'Fes Medina Walking Tour', loc:'Fes, Morocco', why:'Matches your taste for immersive local ritual', source:'Viator', recommendedScore:8.4, avgScore:7.8, trendCount:143, price:2, tags:['Off the beaten path','Family-friendly'], recSampleSize:1300, avgSampleCount:1}]
};

/* ---- Feed: friend activity posts ---- */
let feedPosts = [
  {id:'fp1', friend:'@jonasw', itemId:null, itemName:'Midnight Bioluminescence Kayak', category:'adrenaline', loc:'Vieques, Puerto Rico', withYou:true, withFriends:[], score:9.4, tier:'liked', note:"Glowing water, completely unreal. You have to do this one with me sometime.", time:'2h ago', likes:6, liked:false, comments:[{from:'@nina.r', text:'Adding this to my list immediately'}]},
  {id:'fp2', friend:'@alex.p', itemId:'a1', itemName:'Nevis Bungy Jump', category:'adrenaline', loc:'Queenstown, New Zealand', withYou:false, withFriends:['f5'], score:9.6, tier:'liked', note:'Screamed the entire way down. Would absolutely do it again.', time:'5h ago', likes:11, liked:true, comments:[{from:'@sofia.k', text:'This is exactly why I refuse to go to Queenstown'},{from:'you', text:'Worth every second, promise'}]},
  {id:'fp3', friend:'@nina.r', itemId:'r2', itemName:'Torres del Paine Trek', category:'nature', loc:'Patagonia, Chile', withYou:false, withFriends:['f1'], score:9.0, tier:'liked', note:'Wind almost knocked us over. Views were worth every gust.', time:'1d ago', likes:8, liked:false, comments:[]},
  {id:'fp4', friend:'@maya_t', itemId:'p1', itemName:'Hidden Waterfall Hike', category:'exploration', loc:'Big Sur, California', withYou:false, withFriends:[], score:8.8, tier:'liked', note:'Found it completely by accident — no crowds, no signage.', time:'1d ago', likes:4, liked:false, comments:[]},
  {id:'fp5', friend:'@sofia.k', itemId:'l2', itemName:'Sunset Catamaran Sail', category:'leisure', loc:'Santorini, Greece', withYou:false, withFriends:[], score:8.1, tier:'liked', note:'Went right after you recommended it — you were right about the caldera views.', time:'2d ago', likes:5, liked:true, comments:[{from:'you', text:'Told you!'}]},
  {id:'fp6', friend:'@sofia.k', itemId:null, itemName:'Rooftop Jazz & Wine', category:'leisure', loc:'Lisbon, Portugal', withYou:false, withFriends:['f5'], score:8.6, tier:'liked', note:'Perfect way to end a long day of walking the Alfama.', time:'3d ago', likes:3, liked:false, comments:[]},
  {id:'fp7', friend:'@you', type:'ask', askText:'Heading to Vietnam for two weeks in the fall — anyone have must-do recommendations?', time:'4d ago', comments:[{from:'@nina.r', text:'Ha Giang loop by motorbike, hands down'},{from:'@jonasw', text:'Cu Chi tunnels if you like history, book a private guide though'}]}
];

let reports = []; // {id, label, reason, time}
const REPORT_REASONS = ['Inappropriate photo', 'Incorrect information', 'Duplicate activity', 'Spam', 'Something else'];

function findAnyItemById(id){
  if(!id) return null;
  for(const cat of Object.keys(ranked)){ const hit = ranked[cat].find(i => i.id === id); if(hit) return {...hit, category:cat}; }
  for(const cat of Object.keys(wantToTry)){ const hit = wantToTry[cat].find(i => i.id === id); if(hit) return {...hit, category:cat}; }
  for(const cat of Object.keys(recs)){ const hit = recs[cat].find(i => i.id === id); if(hit) return {...hit, category:cat}; }
  return null;
}

function toggleLike(postId){
  const p = feedPosts.find(x => x.id === postId);
  if(!p) return;
  p.liked = !p.liked;
  p.likes += p.liked ? 1 : -1;
  renderFeed();
}

function openComments(postId){
  const p = feedPosts.find(x => x.id === postId);
  if(!p) return;
  function render(){
    document.getElementById('comment-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:4px;">${friendDisplayName(p.friend)}'s ${p.type === 'ask' ? 'question' : 'post'}</h3>
      <p class="caption" style="text-align:left; margin-bottom:12px;">${p.type === 'ask' ? p.askText : p.itemName}</p>
      <div class="msg-thread" id="comment-thread-inner">
        ${p.comments.length ? p.comments.map(c => `<div class="msg-bubble ${c.from === 'you' ? 'you' : 'them'}"><b>${c.from === 'you' ? '' : friendDisplayName(c.from) + ': '}</b>${c.text}</div>`).join('') : '<p class="caption" style="text-align:left;">No comments yet.</p>'}
      </div>
      <div class="msg-input-row">
        <input type="text" id="comment-input" placeholder="Add a comment...">
        <button class="btn btn-brass btn-sm" id="comment-send">Send</button>
      </div>
      <button class="btn btn-outline btn-block" id="comment-close" style="margin-top:12px;">Close</button>
    `;
    document.getElementById('comment-close').addEventListener('click', () => document.getElementById('comment-overlay').classList.remove('active'));
    document.getElementById('comment-send').addEventListener('click', () => {
      const input = document.getElementById('comment-input');
      if(!input.value.trim()) return;
      p.comments.push({from:'you', text:input.value.trim()});
      render();
      renderFeed();
    });
  }
  render();
  document.getElementById('comment-overlay').classList.add('active');
}
document.getElementById('comment-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'comment-overlay') document.getElementById('comment-overlay').classList.remove('active');
});

function openAskFriends(){
  document.getElementById('ask-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:4px;">Ask friends</h3>
    <p class="caption" style="text-align:left; margin-bottom:12px;">Post a question to your feed — friends can reply with recommendations.</p>
    <textarea id="ask-text" class="field-select" style="height:80px; resize:none;" placeholder="e.g. Heading to Lisbon in June, any spots I shouldn't miss?"></textarea>
    <button class="btn btn-brass btn-block" id="ask-submit" style="margin-top:12px;">Post to feed</button>
    <button class="btn btn-outline btn-block" id="ask-cancel" style="margin-top:8px;">Cancel</button>
  `;
  document.getElementById('ask-overlay').classList.add('active');
  document.getElementById('ask-cancel').addEventListener('click', () => document.getElementById('ask-overlay').classList.remove('active'));
  document.getElementById('ask-submit').addEventListener('click', () => {
    const text = document.getElementById('ask-text').value.trim();
    if(!text){ toast('Write your question first', false); return; }
    feedPosts.unshift({id:'fp' + Date.now(), friend:'@you', type:'ask', askText:text, time:'just now', comments:[]});
    document.getElementById('ask-overlay').classList.remove('active');
    renderFeed();
    toast('Posted — friends will see this in their feed');
  });
}
document.getElementById('ask-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'ask-overlay') document.getElementById('ask-overlay').classList.remove('active');
});

function openReportFlow(label){
  let selected = null;
  function render(){
    document.getElementById('report-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:2px;">Report</h3>
      <p class="caption" style="text-align:left; margin-bottom:10px;">${label}</p>
      ${REPORT_REASONS.map(r => `
        <div class="report-reason-row" data-reason="${r}">
          <div class="report-radio ${selected === r ? 'selected' : ''}"></div>
          <div style="font-size:12.5px; color:var(--ink);">${r}</div>
        </div>`).join('')}
      <button class="btn btn-brass btn-block" id="report-submit" style="margin-top:14px;">Submit report</button>
      <button class="btn btn-outline btn-block" id="report-cancel" style="margin-top:8px;">Cancel</button>
    `;
    document.querySelectorAll('[data-reason]').forEach(row => row.addEventListener('click', () => {
      selected = row.dataset.reason;
      render();
    }));
    document.getElementById('report-cancel').addEventListener('click', () => document.getElementById('report-overlay').classList.remove('active'));
    document.getElementById('report-submit').addEventListener('click', () => {
      if(!selected){ toast('Pick a reason first', false); return; }
      reports.push({id:'rp' + Date.now(), label, reason:selected, time:'just now'});
      document.getElementById('report-overlay').classList.remove('active');
      renderQueue();
      toast('Reported — thanks for flagging this');
    });
  }
  render();
  document.getElementById('report-overlay').classList.add('active');
}
document.getElementById('report-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'report-overlay') document.getElementById('report-overlay').classList.remove('active');
});

const INVITE_PERKS = [
  {key:'social', label:'Social Links', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6M15 14c3 0 6 2 6 5"/></svg>', threshold:1},
  {key:'stealth', label:'Stealth Mode', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>', threshold:2},
  {key:'trips', label:'Trip Planning', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>', threshold:3},
  {key:'avgScore', label:'Average Scores', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 2v20M2 12h20"/></svg>', real:true},
  {key:'resPriority', label:'Res Priority', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 13l4 4L19 7"/></svg>', real:true}
];
let revealedPerks = new Set();
function renderInviteCard(){
  const perks = perksUnlocked();
  const resTier = currentResPriorityTier();
  const joinedCount = invites.filter(i => i.status === 'joined').length;
  const statuses = INVITE_PERKS.map(p => p.real ? perks[p.key] : joinedCount >= p.threshold);
  const unlockedCount = statuses.filter((s, idx) => s && (INVITE_PERKS[idx].real || revealedPerks.has(INVITE_PERKS[idx].key))).length;
  document.getElementById('invite-progress-card').innerHTML = `
    <div class="invite-card">
      <div class="invite-card-title">You have ${Math.max(0, user.invitesTotal - invites.length)} invites left!</div>
      <div class="invite-card-sub">Unlock features when a friend joins with your link (${unlockedCount}/${INVITE_PERKS.length})</div>
      <div class="invite-perk-grid">
        ${INVITE_PERKS.map((p, idx) => {
          const eligible = statuses[idx];
          const revealed = p.real ? eligible : revealedPerks.has(p.key);
          const readyToReveal = eligible && !revealed;
          const stateClass = revealed ? 'unlocked' : readyToReveal ? 'ready' : 'locked-blur';
          return `
          <div class="invite-perk ${readyToReveal ? 'tappable' : ''}" ${readyToReveal ? `data-reveal-perk="${p.key}"` : ''}>
            <div class="invite-perk-icon ${stateClass}" style="${revealed && p.key==='resPriority' && resTier ? `background:${TIER_COLORS[resTier.tier]}; border-color:${TIER_COLORS[resTier.tier]};` : ''}">
              ${revealed ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>' : p.icon}
            </div>
            <div class="invite-perk-label ${!revealed ? 'blurred-text' : ''}">${revealed ? (p.label + (p.key==='resPriority' && resTier ? ` · ${resTier.tier}` : '')) : (readyToReveal ? 'Tap to unlock!' : p.label)}</div>
          </div>`;
        }).join('')}
      </div>
      <button class="btn btn-brass btn-block" id="invite-friends-btn">Invite friends</button>
    </div>`;
  document.querySelectorAll('[data-reveal-perk]').forEach(el => el.addEventListener('click', () => {
    const key = el.dataset.revealPerk;
    revealedPerks.add(key);
    const p = INVITE_PERKS.find(x => x.key === key);
    renderInviteCard();
    toast(`Unlocked: ${p.label}!`);
  }));
  document.getElementById('invite-friends-btn').addEventListener('click', () => {
    viewingOtherProfile = null;
    profileSubTab = 'standing';
    switchToScreen('profile');
    renderAll();
  });
}

function resolveFeedItem(p){
  const item = p.itemId ? findAnyItemById(p.itemId) : null;
  if(item) return item;
  return {
    id: 'feedpost-' + p.id, name: p.itemName, loc: p.loc, category: p.category,
    blurb: 'Logged by ' + friendDisplayName(p.friend) + '. Not yet in your catalog.',
    score: null, photos: []
  };
}
function renderTripCountdown(){
  const withDays = trips
    .filter(t => t.startDate)
    .map(t => ({ trip:t, daysUntil: Math.ceil((new Date(t.startDate) - new Date()) / 86400000) }))
    .filter(x => x.daysUntil >= 0)
    .sort((a,b) => a.daysUntil - b.daysUntil);
  const el = document.getElementById('trip-countdown-banner');
  if(!withDays.length){ el.innerHTML = ''; return; }
  const { trip, daysUntil } = withDays[0];
  const emptyDay = daysUntil <= 7 ? trip.days.find(d => d.itemIds.length === 0) : null;
  el.innerHTML = `
    <div class="trip-countdown-card" id="trip-countdown-click">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>
      <div>
        <b>${daysUntil === 0 ? 'Today' : daysUntil + ' day' + (daysUntil > 1 ? 's' : '') + ' until'}</b> your trip: ${trip.title}
        ${emptyDay ? `<div style="font-size:11px; opacity:0.85; margin-top:2px;">${emptyDay.label} still has nothing planned</div>` : ''}
      </div>
    </div>`;
  document.getElementById('trip-countdown-click').addEventListener('click', () => openTripDetail(trip));
}

let dismissedOnThisDay = null; // stores today's date string once dismissed for the day
function getOnThisDayMatches(){
  const allRanked = Object.values(ranked).flat();
  const today = new Date();
  const matches = [];
  allRanked.forEach(item => {
    const dates = new Set();
    if(item.loggedDate) dates.add(item.loggedDate);
    (item.visitDates || []).forEach(d => dates.add(d));
    dates.forEach(dStr => {
      const d = new Date(dStr + 'T00:00:00');
      if(d.getMonth() === today.getMonth() && d.getDate() === today.getDate() && d.getFullYear() < today.getFullYear()){
        matches.push({item, yearsAgo: today.getFullYear() - d.getFullYear()});
      }
    });
  });
  return matches;
}
function renderOnThisDay(){
  const el = document.getElementById('on-this-day-banner');
  const todayStr = new Date().toISOString().slice(0,10);
  if(dismissedOnThisDay === todayStr){ el.innerHTML = ''; return; }
  // Only surfaces activities with a real, user-picked date that lands on today's
  // month/day in a past year — a bulk-dumped activity with no chosen date never
  // qualifies, so this won't misrepresent things you didn't actually do "today."
  const matches = getOnThisDayMatches();
  if(!matches.length){ el.innerHTML = ''; return; }
  const { item, yearsAgo } = matches[0];
  const cat = item.category || findItemCategory(item.id) || currentCategory;
  el.innerHTML = `
    <div class="memory-card" id="on-this-day-click">
      <div class="memory-media" style="${mediaStyle(cat, item.photo)}">${item.photo ? '' : itemArt(item, cat)}</div>
      <div style="flex:1;">
        <div class="memory-label">${yearsAgo} year${yearsAgo > 1 ? 's' : ''} ago today</div>
        <div class="rank-name" style="font-size:13px;">${item.name}</div>
        <div class="rank-loc">${item.loc}${item.lastVisited ? ` · ${item.lastVisited}` : ''}</div>
      </div>
      <button class="memory-dismiss" id="on-this-day-dismiss" aria-label="Dismiss">✕</button>
    </div>`;
  document.getElementById('on-this-day-click').addEventListener('click', () => openDetail(item));
  document.getElementById('on-this-day-dismiss').addEventListener('click', (e) => {
    e.stopPropagation();
    dismissedOnThisDay = todayStr;
    renderOnThisDay();
    scheduleSave();
  });
}

function renderOnboardingEmptyState(){
  const totalLogged = Object.values(ranked).reduce((n, arr) => n + arr.length, 0);
  const el = document.getElementById('onboarding-empty-card');
  if(totalLogged > 0){ el.innerHTML = ''; return; }
  el.innerHTML = `
    <div class="invite-card" style="background:var(--brass); color:var(--ink);">
      <div class="invite-card-title" style="color:var(--ink);">Welcome to Jaunt</div>
      <div class="invite-card-sub" style="color:var(--ink); opacity:0.8;">Rank your first activity to unlock your Travel Profile, taste map, and recommendations.</div>
      <button class="btn btn-brass" style="background:var(--ink); color:var(--brass); margin-top:14px;" id="onboarding-start-btn">Find something to rank</button>
    </div>`;
  document.getElementById('onboarding-start-btn').addEventListener('click', () => switchToScreen('search'));
}

let lastSeenFeedPostCount = null; // null until first computed, so a fresh load never falsely shows "new"
function renderNewPostsIndicator(){
  const el = document.getElementById('new-posts-indicator');
  if(lastSeenFeedPostCount === null){
    lastSeenFeedPostCount = feedPosts.length;
    el.innerHTML = '';
    return;
  }
  const newCount = feedPosts.length - lastSeenFeedPostCount;
  if(newCount <= 0){ el.innerHTML = ''; return; }
  el.innerHTML = `<button class="new-posts-pill" id="new-posts-btn">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
    ${newCount} new post${newCount > 1 ? 's' : ''} — tap to view
  </button>`;
  document.getElementById('new-posts-btn').addEventListener('click', () => {
    lastSeenFeedPostCount = feedPosts.length;
    renderFeed();
    const feedScreen = document.getElementById('screen-feed');
    if(feedScreen.scrollTo) feedScreen.scrollTo({top:0, behavior:'smooth'});
  });
}

function feedStockPhoto(seed){
  // Lorem Picsum: free, prototyping-licensed placeholder photos, real images.
  // Seeded by post id so each post gets a stable "random" photo, not a new one every render.
  return `https://picsum.photos/seed/${encodeURIComponent(seed)}/600/400`;
}
function renderFeed(){
  renderOnboardingEmptyState();
  renderTripCountdown();
  renderOnThisDay();
  renderInviteCard();
  renderFeaturedLists();
  renderNewPostsIndicator();
  const el = document.getElementById('feed-content');
  el.innerHTML = feedPosts.map(p => {
    const withList = p.type === 'ask' ? [] : [...(p.withFriends || []).map(fid => { const f = FRIENDS.find(x => x.id===fid); return f ? f.name : null; }).filter(Boolean), ...(p.withYou ? [myName || 'you'] : [])];
    const displayName = friendDisplayName(p.friend);
    if(p.type === 'ask'){
      return `<div class="feed-post">
        <div class="feed-top">
          <span class="mini-avatar feed-avatar" data-open-profile="${p.friend}">${displayName[0].toUpperCase()}</span>
          <div class="feed-body">
            <div class="feed-text"><b data-open-profile="${p.friend}" style="cursor:pointer;">${displayName}</b> asked for recommendations</div>
            <div class="feed-note">"${p.askText}"</div>
          </div>
          <span class="feed-time">${p.time}</span>
        </div>
        <div class="feed-actions">
          <button class="feed-action-btn" data-comment="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            ${p.comments.length} ${p.comments.length===1?'reply':'replies'}
          </button>
        </div>
      </div>`;
    }
    if(p.type === 'bookmark'){
      return `<div class="feed-post" data-feed-open="${p.itemId || ''}" data-feed-fallback="${p.id}">
        <div class="feed-top">
          <span class="mini-avatar feed-avatar" data-open-profile="${p.friend}">${displayName[0].toUpperCase()}</span>
          <div class="feed-body">
            <div class="feed-text"><b data-open-profile="${p.friend}" style="cursor:pointer;">${displayName}</b> bookmarked <b>${p.itemName}</b></div>
            <div class="feed-meta">${LABELS[p.category]} · ${p.loc}</div>
          </div>
          <span class="feed-time">${p.time}</span>
        </div>
        <img class="feed-photo" src="${feedStockPhoto(p.id)}">
        <div class="feed-actions">
          <button class="feed-action-btn ${p.liked ? 'liked' : ''}" data-like="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>
            ${p.likes}
          </button>
          <button class="feed-action-btn" data-comment="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
            ${p.comments.length}
          </button>
          <button class="feed-action-btn" data-share="${p.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
          </button>
        </div>
      </div>`;
    }
    return `<div class="feed-post" data-feed-open="${p.itemId || ''}" data-feed-fallback="${p.id}">
      <div class="feed-top">
        <span class="mini-avatar feed-avatar" data-open-profile="${p.friend}">${displayName[0].toUpperCase()}</span>
        <div class="feed-body">
          <div class="feed-text"><b data-open-profile="${p.friend}" style="cursor:pointer;">${displayName}</b> ranked <b>${p.itemName}</b>${withList.length ? ` with <b>${withList.join(', ')}</b>` : ''}</div>
          <div class="feed-meta">${LABELS[p.category]} · ${p.loc}</div>
          ${p.note ? `<div class="feed-note">${p.note}</div>` : ''}
        </div>
        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:6px;">
          ${feedScoreChip(p, true)}
          <span class="feed-time">${p.time}</span>
        </div>
      </div>
      <img class="feed-photo" src="${p.photo ? p.photo.src : feedStockPhoto(p.id)}">${p.photo && p.photo.caption ? `<div class="feed-photo-caption">${p.photo.caption}</div>` : ''}
      <div class="feed-actions">
        <button class="feed-action-btn ${p.liked ? 'liked' : ''}" data-like="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>
          ${p.likes}
        </button>
        <button class="feed-action-btn" data-comment="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
          ${p.comments.length}
        </button>
        <button class="feed-action-btn" data-share="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
        </button>
        <button class="feed-action-btn" data-quicklist="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5v14M5 12h14"/></svg>
        </button>
        <button class="feed-action-btn report-btn" data-report="${p.id}">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V4s-1 1-4 1-5-2-8-2-4 1-4 1z"/><path d="M4 22V4"/></svg>
        </button>
      </div>
    </div>`;
  }).join('');

  el.querySelectorAll('[data-share]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const p = feedPosts.find(x => x.id === btn.dataset.share);
    toast(`Link copied — ${p ? p.itemName : 'post'}`);
  }));
  el.querySelectorAll('[data-quicklist]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const p = feedPosts.find(x => x.id === btn.dataset.quicklist);
    if(p) openListChooser(resolveFeedItem(p));
  }));

  el.querySelectorAll('[data-open-profile]').forEach(el2 => el2.addEventListener('click', (e) => {
    e.stopPropagation();
    const handle = el2.dataset.openProfile;
    if(handle === '@you'){ viewingOtherProfile = null; switchToScreen('profile'); renderProfileTab(); return; }
    const friend = FRIENDS.find(f => f.handle === handle);
    if(friend) openPublicProfile(friend);
  }));
  el.querySelectorAll('[data-like]').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); toggleLike(btn.dataset.like); }));
  el.querySelectorAll('[data-comment]').forEach(btn => btn.addEventListener('click', (e) => { e.stopPropagation(); openComments(btn.dataset.comment); }));
  el.querySelectorAll('[data-report]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const p = feedPosts.find(x => x.id === btn.dataset.report);
    openReportFlow(`${friendDisplayName(p.friend)}'s post about ${p.itemName}`);
  }));

  el.querySelectorAll('[data-feed-open]').forEach(card => {
    const id = card.dataset.feedOpen;
    const item = id ? findAnyItemById(id) : null;
    if(item){
      card.addEventListener('click', () => openDetail(item));
    } else {
      const fallbackId = card.dataset.feedFallback;
      const p = feedPosts.find(x => x.id === fallbackId);
      if(p) card.addEventListener('click', () => openDetail(resolveFeedItem(p)));
    }
  });
}

function friendsThinkSection(item){
  const matches = feedPosts.filter(p => p.itemId === item.id);
  if(!matches.length) return '';
  const perks = perksUnlocked();
  if(!perks.avgScore){
    return `<div class="sec-label">What your friends think</div>
    <div class="empty" style="padding:18px 10px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V7a4 4 0 018 0v4"/></svg>
      <p>Invite a friend who joins to see what your friends think.</p>
    </div>`;
  }
  return `<div class="sec-label">What your friends think</div>
    ${matches.map(p => `
      <div class="friend-note-row">
        <span class="mini-avatar">${p.friend[1].toUpperCase()}</span>
        <div style="flex:1;">
          <div class="friend-note-top">${friendDisplayName(p.friend)}${feedScoreChip(p, true)}</div>
          <div class="friend-note-text">"${p.note}"</div>
        </div>
      </div>`).join('')}`;
}

/* ---- Notifications ---- */
let notifSettings = {
  enabled: null, // null = not yet asked, true/false once the user decides
  likes: true,
  comments: true,
  invites: true,
  waitlist: true,
  tags: true,
  askReplies: true,
  coPlanner: true
};
let notifications = [
  {id:'nt1', icon:'invite', type:'invites', text:'<b>@alex.p</b> accepted your invite and joined Jaunt', time:'1h ago', read:false},
  {id:'nt2', icon:'rank', type:'rank', text:'<b>@nina.r</b> ranked <b>Torres del Paine Trek</b>', time:'6h ago', read:false},
  {id:'nt3', icon:'waitlist', type:'waitlist', text:'Your spot on <b>Nevis Bungy Jump</b> was claimed from the waitlist', time:'1d ago', read:false},
  {id:'nt4', icon:'tag', type:'tags', text:'<b>@sofia.k</b> tagged you in <b>Midnight Bioluminescence Kayak</b>', time:'2d ago', read:true},
  {id:'nt5', icon:'queue', type:'rank', text:'Your suggestion <b>Hidden Waterfall Hike</b> is pending review', time:'3d ago', read:true}
];
const NOTIF_ICONS = {
  invite: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M22 12h-6l-2 3h-4l-2-3H2"/><path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"/></svg>',
  rank: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3v13M8 16l-3-3M8 16l3-3M16 21V8M16 8l-3 3M16 8l3 3"/></svg>',
  waitlist: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>',
  tag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="9" cy="8" r="3"/><path d="M2 20c0-3.5 3-6 7-6s7 2.5 7 6"/></svg>',
  queue: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>',
  like: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>',
  comment: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>'
};
function renderNotifBadge(){
  const badge = document.getElementById('notif-badge');
  if(!notifSettings.enabled){ badge.style.display = 'none'; return; }
  const unread = notifications.filter(n => !n.read).length;
  badge.style.display = unread ? 'flex' : 'none';
  badge.textContent = unread;
}
function openNotifications(){
  if(!notifSettings.enabled){
    document.getElementById('notif-modal').innerHTML = `
      <div class="empty" style="padding:36px 16px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.7 21a2 2 0 01-3.4 0"/><path d="M3 3l18 18"/></svg>
        <p style="color:var(--ink); font-weight:600;">Notifications are off</p>
        <p>Turn them on in Profile → Standing to see activity like this.</p>
      </div>
      <button class="btn btn-brass btn-block" id="notif-close">Close</button>`;
  } else {
    document.getElementById('notif-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:12px;">Notifications</h3>
      ${notifications.length ? notifications.map(n => `
        <div class="notif-row ${n.read ? '' : 'unread'}">
          <div class="notif-icon">${NOTIF_ICONS[n.icon]}</div>
          <div>
            <div class="notif-text">${n.text}</div>
            <div class="notif-time">${n.time}</div>
          </div>
        </div>`).join('') : `<p class="caption" style="text-align:left;">Nothing yet.</p>`}
      <button class="btn btn-outline btn-block" id="notif-simulate" style="margin-top:12px;">Simulate: someone interacts with your post</button>
      <button class="btn btn-brass btn-block" id="notif-close" style="margin-top:8px;">Close</button>`;
  }
  document.getElementById('notif-overlay').classList.add('active');
  notifications.forEach(n => n.read = true);
  renderNotifBadge();
  document.getElementById('notif-close').addEventListener('click', () => document.getElementById('notif-overlay').classList.remove('active'));
  const simBtn = document.getElementById('notif-simulate');
  if(simBtn) simBtn.addEventListener('click', simulatePostInteraction);
}
function simulatePostInteraction(){
  const myAskPost = feedPosts.find(p => p.friend === '@you' && p.type === 'ask');
  const myRankPost = feedPosts.find(p => p.friend === '@you' && p.type !== 'ask');
  const actor = FRIENDS[Math.floor(Math.random() * FRIENDS.length)];
  const roll = Math.random();
  const kind = (roll < 0.34 && myAskPost) ? 'askReply' : (roll < 0.67 ? 'comment' : 'like');

  if(kind === 'askReply'){
    if(!notifSettings.askReplies){ toast('Reply notifications are off', false); return; }
    myAskPost.comments.push({from: actor.handle, text:'You should check out where I went last time!'});
    notifications.unshift({
      id:'nt' + Date.now(), icon:'comment', type:'askReplies',
      text: `<b>${actor.handle}</b> replied to your question`,
      time:'just now', read:false
    });
  } else if(kind === 'comment'){
    if(!notifSettings.comments){ toast('Comment notifications are off', false); return; }
    const postName = myRankPost ? myRankPost.itemName : 'your post';
    if(myRankPost) myRankPost.comments.push({from: actor.handle, text:'Adding this to my list!'});
    notifications.unshift({
      id:'nt' + Date.now(), icon:'comment', type:'comments',
      text: `<b>${actor.handle}</b> commented on your post about <b>${postName}</b>`,
      time:'just now', read:false
    });
  } else {
    if(!notifSettings.likes){ toast('Like notifications are off', false); return; }
    const postName = myRankPost ? myRankPost.itemName : 'your post';
    if(myRankPost) myRankPost.likes++;
    notifications.unshift({
      id:'nt' + Date.now(), icon:'like', type:'likes',
      text: `<b>${actor.handle}</b> liked your post about <b>${postName}</b>`,
      time:'just now', read:false
    });
  }
  openNotifications();
  renderFeed();
}
document.getElementById('notif-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'notif-overlay') document.getElementById('notif-overlay').classList.remove('active');
});

/* ---- Notification permission prompt (onboarding) ---- */
function openNotifPermissionPrompt(){
  document.getElementById('quiz-modal').innerHTML = `
    <div style="text-align:center; padding:10px 4px 4px;">
      <div class="notif-icon" style="width:52px; height:52px; margin:0 auto 14px;">${NOTIF_ICONS.invite}</div>
      <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:6px;">Turn on notifications?</h3>
      <p class="caption" style="margin-bottom:16px;">Hear about invites joining, friends ranking places, and people interacting with your posts. You can turn this on or off anytime in Standing, or from your phone's system settings.</p>
    </div>
    <button class="btn btn-brass btn-block" id="notif-perm-yes">Turn on notifications</button>
    <button class="btn btn-outline btn-block" id="notif-perm-no" style="margin-top:8px;">Not now</button>
  `;
  document.getElementById('notif-perm-yes').addEventListener('click', () => {
    notifSettings.enabled = true;
    document.getElementById('quiz-overlay').classList.remove('active');
    renderAll();
    toast('Notifications turned on');
  });
  document.getElementById('notif-perm-no').addEventListener('click', () => {
    notifSettings.enabled = false;
    document.getElementById('quiz-overlay').classList.remove('active');
    renderAll();
    toast('You can turn these on later in Standing');
  });
  document.getElementById('quiz-overlay').classList.add('active');
}

/* ---- Messages ---- */
let conversations = [
  {id:'c1', friend:'@nina.r', unread:true, messages:[
    {from:'them', text:'You have to do Torres del Paine next time you\'re in Patagonia', time:'6h ago'},
    {from:'them', text:'Wind was insane but so worth it', time:'6h ago'}
  ]},
  {id:'c2', friend:'@jonasw', unread:false, messages:[
    {from:'them', text:'That kayak tour was unreal, you\'d love it', time:'2d ago'},
    {from:'you', text:'Adding it to my want-to-try list right now', time:'2d ago'}
  ]},
  {id:'c3', friend:'@sofia.k', unread:false, messages:[
    {from:'them', text:'Went to the catamaran sail you ranked — you were right', time:'2d ago'}
  ]}
];
function openThreadWithHandle(handle){
  let convo = conversations.find(c => c.friend === handle);
  if(!convo){
    convo = {id:'c' + Date.now(), friend:handle, unread:false, messages:[]};
    conversations.push(convo);
  }
  document.getElementById('msg-overlay').classList.add('active');
  openThread(convo.id);
}
function renderConvoList(){
  document.getElementById('msg-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:12px;">Messages</h3>
    ${conversations.map(c => {
      const last = c.messages[c.messages.length-1];
      return `<div class="convo-row" data-convo="${c.id}">
        <span class="mini-avatar" style="width:34px;height:34px;font-size:11px;">${c.friend[1].toUpperCase()}</span>
        <div style="flex:1; min-width:0;">
          <div class="convo-name">${friendDisplayName(c.friend)}</div>
          <div class="convo-preview">${last ? (last.from === 'you' ? 'You: ' : '') + last.text : 'Say hello'}</div>
        </div>
        ${c.unread ? '<span class="convo-unread-dot"></span>' : ''}
      </div>`;
    }).join('')}
    <button class="btn btn-outline btn-block" id="msg-close" style="margin-top:12px;">Close</button>
  `;
  document.querySelectorAll('[data-convo]').forEach(row => row.addEventListener('click', () => openThread(row.dataset.convo)));
  document.getElementById('msg-close').addEventListener('click', () => document.getElementById('msg-overlay').classList.remove('active'));
}
function openThread(convoId){
  const convo = conversations.find(c => c.id === convoId);
  convo.unread = false;
  document.getElementById('msg-modal').innerHTML = `
    <div style="display:flex; align-items:center; gap:10px; margin-bottom:12px;">
      <button id="thread-back" style="background:none; border:none; cursor:pointer; color:var(--ink);">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg>
      </button>
      <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink);">${friendDisplayName(convo.friend)}</h3>
    </div>
    <div class="msg-thread" id="msg-thread-inner">
      ${convo.messages.map(m => `<div class="msg-bubble ${m.from}">${m.text}</div>`).join('')}
    </div>
    <div class="msg-input-row">
      <input type="text" id="msg-input" placeholder="Message ${convo.friend}...">
      <button class="btn btn-brass btn-sm" id="msg-send">Send</button>
    </div>
  `;
  document.getElementById('thread-back').addEventListener('click', renderConvoList);
  document.getElementById('msg-send').addEventListener('click', () => {
    const input = document.getElementById('msg-input');
    if(!input.value.trim()) return;
    convo.messages.push({from:'you', text:input.value.trim(), time:'now'});
    openThread(convoId);
  });
}
document.getElementById('msg-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'msg-overlay') document.getElementById('msg-overlay').classList.remove('active');
});

/* ---- Achievements / badges ---- */
const BADGE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="8" r="6"/><path d="M9 13l-2 8 5-3 5 3-2-8"/></svg>';
const SPECIALIST_THRESHOLD = 5; // matches the new Bronze tier threshold below

/* ---- First Finder badge: rewards adding new activities that get approved ---- */
let firstFinderCount = 0;
const FIRST_FINDER_TIERS = [
  {level:1, name:'Local Scout', threshold:1},
  {level:2, name:'Urban Explorer', threshold:6},
  {level:3, name:'Jaunt Pioneer', threshold:21}
];
function currentFirstFinderTier(){
  let current = null;
  for(const t of FIRST_FINDER_TIERS){
    if(firstFinderCount >= t.threshold) current = t;
  }
  return current;
}
function nextFirstFinderTier(){
  return FIRST_FINDER_TIERS.find(t => firstFinderCount < t.threshold) || null;
}
function renderFirstFinderShowcase(){
  const el = document.getElementById('first-finder-showcase');
  const current = currentFirstFinderTier();
  const next = nextFirstFinderTier();
  el.innerHTML = `
    <div class="ff-showcase-card">
      <div class="ff-showcase-icon" style="${current ? '' : 'background:var(--slate);'}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
      </div>
      <div style="flex:1;">
        <div style="font-family:'Fraunces',serif; font-weight:700; font-size:14px; color:var(--ink);">${current ? current.name : 'Not a First Finder yet'}</div>
        <div class="caption" style="margin:2px 0 0; text-align:left;">${firstFinderCount} activities added${next ? ` · ${next.threshold - firstFinderCount} more to ${next.name}` : ' · Max level'}</div>
      </div>
    </div>`;
}
function renderFirstFinderPreview(){
  const el = document.getElementById('first-finder-preview');
  if(!el) return;
  const current = currentFirstFinderTier();
  const next = nextFirstFinderTier();
  el.innerHTML = `
    <div class="ff-tier-row">
      ${FIRST_FINDER_TIERS.map(t => `
        <div class="ff-tier-chip ${current && current.level === t.level ? 'current' : firstFinderCount >= t.threshold ? 'earned' : ''}">
          <div class="ff-tier-level">Lv ${t.level}</div>
          <div class="ff-tier-name">${t.name}</div>
          <div class="ff-tier-req">${t.threshold}+ added</div>
        </div>`).join('')}
    </div>
    <p class="caption" style="text-align:left; margin-top:6px;">
      ${current ? `You're a ${current.name} (${firstFinderCount} added)` : `Submit and get this approved to become a Local Scout`}${next ? ` — ${next.threshold - firstFinderCount} more to ${next.name}` : ''}
    </p>`;
}
const SPECIALIST_NAMES = {
  exploration: 'Trailblazer',
  nature: 'Wild at Heart',
  adrenaline: 'Adrenaline Junkie',
  leisure: 'Master Relaxer',
  culture: 'Culture Vulture'
};
const TIER_COLORS = { Bronze:'#A8703F', Silver:'#8C97A0', Gold:'#B4894F', Platinum:'#5C6670' };

function computeBadgeGroups(){
  const allRanked = Object.values(ranked).flat();
  const countries = new Set(allRanked.map(i => i.loc.split(',').pop().trim()));

  const groups = [
    {
      id:'places', name:'Places Logged', value: allRanked.length,
      levels:[{tier:'Bronze',threshold:5},{tier:'Silver',threshold:25},{tier:'Gold',threshold:60},{tier:'Platinum',threshold:120}]
    },
    {
      id:'countries', name:'Countries Visited', value: countries.size,
      levels:[{tier:'Bronze',threshold:8},{tier:'Silver',threshold:20},{tier:'Gold',threshold:40},{tier:'Platinum',threshold:60}]
    },
    ...Object.keys(LABELS).map(cat => ({
      id:'spec_' + cat, name: SPECIALIST_NAMES[cat], value: ranked[cat].length,
      levels:[{tier:'Bronze',threshold:5},{tier:'Silver',threshold:15},{tier:'Gold',threshold:30}]
    }))
  ];

  return groups.map(g => {
    let currentTier = null;
    let nextLevel = null;
    for(const lvl of g.levels){
      if(g.value >= lvl.threshold) currentTier = lvl;
      else { nextLevel = lvl; break; }
    }
    return { ...g, currentTier, nextLevel, maxed: !nextLevel };
  });
}

function computeAchievements(){
  // flat, one-off achievements that don't have a natural "more of" progression
  const allRanked = Object.values(ranked).flat();
  const categoriesUsed = Object.keys(ranked).filter(cat => ranked[cat].length > 0).length;
  const maxScore = allRanked.length ? Math.max(...allRanked.map(i => i.score)) : 0;
  return [
    {name:'Well-Rounded', desc:'Log all 5 categories', unlocked: categoriesUsed >= 5},
    {name:'Unforgettable', desc:'Score something 9.5+', unlocked: maxScore >= 9.5},
    {name:'Reliable Traveler', desc:'Reach 90% reliability', unlocked: user.reliability >= 90},
    {name:'Networked', desc:'Have an invite join', unlocked: invites.some(i => i.status === 'joined')}
  ];
}

function unlockedBadgeCount(){
  const groupsUnlocked = computeBadgeGroups().filter(g => g.currentTier).length;
  const flatUnlocked = computeAchievements().filter(b => b.unlocked).length;
  return groupsUnlocked + flatUnlocked;
}
function totalBadgeCount(){
  return computeBadgeGroups().length + computeAchievements().length;
}

function openBadges(){
  const groups = computeBadgeGroups();
  const flat = computeAchievements();
  document.getElementById('badges-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:4px;">Badges</h3>
    <p class="caption" style="text-align:left; margin-bottom:10px;">${unlockedBadgeCount()} of ${totalBadgeCount()} unlocked · badges level up as you log more</p>
    <div class="sec-label" style="margin-top:0;">Progression badges</div>
    <div class="badge-grid">
      ${groups.map(g => `
        <div class="badge-card ${g.currentTier ? '' : 'locked'}">
          <div class="badge-circle" style="${g.currentTier ? `background:${TIER_COLORS[g.currentTier.tier]};` : ''}">${BADGE_ICON}</div>
          <div class="badge-name">${g.name}</div>
          <div class="badge-desc">${g.currentTier ? `${g.currentTier.tier}${g.nextLevel ? ` · ${g.value}/${g.nextLevel.threshold} to ${g.nextLevel.tier}` : ' · Maxed'}` : `${g.value}/${g.levels[0].threshold} to Bronze`}</div>
        </div>`).join('')}
    </div>
    <div class="sec-label">Other achievements</div>
    <div class="badge-grid">
      ${flat.map(b => `
        <div class="badge-card ${b.unlocked ? '' : 'locked'}">
          <div class="badge-circle">${BADGE_ICON}</div>
          <div class="badge-name">${b.name}</div>
          <div class="badge-desc">${b.desc}</div>
        </div>`).join('')}
    </div>
    <button class="btn btn-brass btn-block" id="badges-close" style="margin-top:16px;">Close</button>
  `;
  document.getElementById('badges-overlay').classList.add('active');
  document.getElementById('badges-close').addEventListener('click', () => document.getElementById('badges-overlay').classList.remove('active'));
}
document.getElementById('badges-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'badges-overlay') document.getElementById('badges-overlay').classList.remove('active');
});

/* ---- Year in travel recap ---- */
function openRecap(){
  const allRanked = Object.values(ranked).flat();
  const countries = new Set(allRanked.map(i => i.loc.split(',').pop().trim()));
  const topItem = allRanked.length ? allRanked.reduce((a,b) => a.score > b.score ? a : b) : null;
  const topCatEntry = Object.entries(ranked).sort((a,b) => b[1].length - a[1].length)[0];
  const shareText = `My ${2026} in travel: ${allRanked.length} places logged across ${countries.size} countries. Top category: ${LABELS[topCatEntry[0]]}.${topItem ? ` Best experience: ${topItem.name}, ${topItem.loc} (${topItem.score.toFixed(1)}/10).` : ''} — via Jaunt`;
  document.getElementById('recap-modal').innerHTML = `
    <div class="recap-card">
      <div class="recap-title">Your Year in Travel</div>
      <div class="recap-sub">2026 so far</div>
      <div class="recap-stats">
        <div><div class="recap-stat-num">${allRanked.length}</div><div class="recap-stat-label">Places logged</div></div>
        <div><div class="recap-stat-num">${countries.size}</div><div class="recap-stat-label">Countries</div></div>
        <div><div class="recap-stat-num">${LABELS[topCatEntry[0]]}</div><div class="recap-stat-label">Top category</div></div>
        <div><div class="recap-stat-num">${topItem ? topItem.score.toFixed(1) : '—'}</div><div class="recap-stat-label">Highest score</div></div>
      </div>
      ${topItem ? `<div class="recap-highlight">Your best-rated experience was <b>${topItem.name}</b>, ${topItem.loc}</div>` : ''}
    </div>
    <button class="btn btn-brass btn-block" id="recap-share" style="margin-top:16px;">Share</button>
    <button class="btn btn-outline btn-block" id="recap-close" style="margin-top:8px;">Close</button>
  `;
  document.getElementById('recap-overlay').classList.add('active');
  document.getElementById('recap-close').addEventListener('click', () => document.getElementById('recap-overlay').classList.remove('active'));
  document.getElementById('recap-share').addEventListener('click', async () => {
    if(navigator.share){
      try { await navigator.share({ title:'My Year in Travel', text:shareText }); return; }
      catch(e){ /* user cancelled or unsupported — fall through to copy */ }
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      try { await navigator.clipboard.writeText(shareText); toast('Summary copied — paste it anywhere'); return; }
      catch(e){ /* fall through */ }
    }
    toast('Sharing isn\'t supported in this browser', false);
  });
}
document.getElementById('recap-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'recap-overlay') document.getElementById('recap-overlay').classList.remove('active');
});

/* ---- Onboarding taste quiz ---- */
let userPrefs = null;
let myUsername = null;
const RESERVED_USERNAMES = new Set(['jaunt','admin','support','help','you','me']);
function normalizeUsername(raw){
  return raw.trim().replace(/^@+/, '').toLowerCase();
}
function usernameError(raw){
  const clean = normalizeUsername(raw);
  if(!clean) return 'Pick a username';
  if(!/^[a-z0-9_.]{3,20}$/.test(clean)) return 'Letters, numbers, underscores, and periods only (3–20 characters)';
  if(RESERVED_USERNAMES.has(clean)) return 'That username is reserved';
  const taken = FRIENDS.some(f => normalizeUsername(f.handle) === clean);
  if(taken) return 'That username is already taken';
  return null;
}
let onboardingLockActive = false;
function openNameStep(){
  onboardingLockActive = true;
  let draftName = '';
  let draftUsername = '';
  function render(){
    const nameErr = draftName.trim() ? null : 'Enter your full name';
    const userErr = usernameError(draftUsername);
    document.getElementById('quiz-modal').innerHTML = `
      <div style="text-align:center; padding:6px 4px;">
        <div class="brand" style="font-size:22px; margin-bottom:2px;">Ja<span>unt</span></div>
        <p class="caption" style="margin-bottom:16px;">First things first — set up your profile</p>
      </div>
      <div class="field"><label>Full name</label><input type="text" id="name-input" placeholder="e.g. Jordan Rivera" value="${draftName.replace(/"/g,'&quot;')}"></div>
      <p class="caption" style="text-align:left; margin:2px 0 12px;">This is what friends will see in the feed — "Jordan ranked Nevis Bungy Jump" instead of a username.</p>
      <div class="field"><label>Username</label>
        <div class="search-box" style="margin-bottom:0;">
          <span style="color:var(--slate); font-weight:600;">@</span>
          <input type="text" id="username-input" placeholder="jordanrivera" value="${draftUsername.replace(/"/g,'&quot;')}" style="text-transform:lowercase;">
        </div>
      </div>
      ${draftUsername ? `<p class="caption" style="text-align:left; margin-top:4px; color:${userErr ? 'var(--signal)' : 'var(--trail)'};">${userErr ? userErr : '✓ @' + normalizeUsername(draftUsername) + ' is available'}</p>` : `<p class="caption" style="text-align:left; margin-top:4px;">This has to be unique — no two Jaunt members can share a username.</p>`}
      <button class="btn btn-brass btn-block" id="name-continue" style="margin-top:14px;" ${nameErr || userErr ? 'disabled' : ''}>Continue</button>
    `;
    const nameEl = document.getElementById('name-input');
    const userEl = document.getElementById('username-input');
    nameEl.addEventListener('input', (e) => {
      draftName = e.target.value;
      const cursorPos = e.target.selectionStart;
      render();
      const fresh = document.getElementById('name-input');
      fresh.focus();
      fresh.setSelectionRange(cursorPos, cursorPos);
    });
    userEl.addEventListener('input', (e) => {
      draftUsername = e.target.value;
      const cursorPos = e.target.selectionStart;
      render();
      const fresh = document.getElementById('username-input');
      fresh.focus();
      fresh.setSelectionRange(cursorPos, cursorPos);
    });
    document.getElementById('name-continue').addEventListener('click', () => {
      if(nameErr || userErr) return;
      myName = draftName.trim();
      myUsername = '@' + normalizeUsername(draftUsername);
      onboardingLockActive = false;
      openTasteQuiz();
    });
  }
  render();
  document.getElementById('quiz-overlay').classList.add('active');
}

function openTasteQuiz(){
  let quizCat = null, quizStyle = null, quizPace = null;
  document.getElementById('quiz-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:4px;">Welcome to Jaunt</h3>
    <p class="caption" style="text-align:left; margin-bottom:14px;">Answer a few quick questions so we can personalize your recommendations.</p>
    <div class="sec-label" style="margin-top:0;">Which excites you most?</div>
    <div class="stamps" id="quiz-cat-stamps" style="margin-bottom:6px;">
      ${Object.keys(LABELS).map(cat => `
        <div class="stamp" style="--c:${COLORS[cat]}" data-quizcat="${cat}">
          ${ICONS[cat]}
          <div class="stamp-label">${LABELS[cat]}</div>
        </div>`).join('')}
    </div>
    <div class="sec-label">How do you like to travel?</div>
    <div class="tier-pills" id="quiz-style">
      ${['Solo','With friends','With family'].map(s => `<button class="tier-pill" style="--c:var(--brass);" data-style="${s}">${s}</button>`).join('')}
    </div>
    <div class="sec-label">Your pace?</div>
    <div class="tier-pills" id="quiz-pace">
      ${['Packed','Balanced','Slow'].map(s => `<button class="tier-pill" style="--c:var(--leisure);" data-pace="${s}">${s}</button>`).join('')}
    </div>
    <button class="btn btn-brass btn-block" id="quiz-submit" style="margin-top:16px;">See my recommendations</button>
    <button class="btn btn-outline btn-block" id="quiz-skip" style="margin-top:8px;">Skip for now</button>
  `;
  document.querySelectorAll('#quiz-cat-stamps .stamp').forEach(s => s.addEventListener('click', () => {
    quizCat = s.dataset.quizcat;
    document.querySelectorAll('#quiz-cat-stamps .stamp').forEach(x => x.classList.remove('selected'));
    s.classList.add('selected');
  }));
  document.querySelectorAll('#quiz-style .tier-pill').forEach(b => b.addEventListener('click', () => {
    quizStyle = b.dataset.style;
    document.querySelectorAll('#quiz-style .tier-pill').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
  }));
  document.querySelectorAll('#quiz-pace .tier-pill').forEach(b => b.addEventListener('click', () => {
    quizPace = b.dataset.pace;
    document.querySelectorAll('#quiz-pace .tier-pill').forEach(x => x.classList.remove('selected'));
    b.classList.add('selected');
  }));
  document.getElementById('quiz-skip').addEventListener('click', () => openNotifPermissionPrompt());
  document.getElementById('quiz-submit').addEventListener('click', () => {
    userPrefs = {topCategory: quizCat, style: quizStyle, pace: quizPace};
    if(quizCat){
      [wantToTry, recs].forEach(dataset => {
        (dataset[quizCat] || []).forEach(i => {
          if(i.recommendedScore != null) i.recommendedScore = Math.min(10, round1(i.recommendedScore + 0.4));
        });
      });
    }
    toast('Thanks! Your recommendations are personalized.');
    openNotifPermissionPrompt();
  });
  document.getElementById('quiz-overlay').classList.add('active');
}
document.getElementById('quiz-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'quiz-overlay' && !onboardingLockActive) document.getElementById('quiz-overlay').classList.remove('active');
});

/* ---- Curated lists ---- */
const curatedLists = [
  {id:'cl1', title:'New Zealand Adventure', subtitle:'Adrenaline & nature on the South Island', color:'var(--signal)', itemIds:['a1','n3']},
  {id:'cl2', title:'Best of the Mediterranean', subtitle:'Coastlines worth the trip', color:'var(--leisure)', itemIds:['l2','r4']},
  {id:'cl3', title:'Epic Treks', subtitle:'Trails to build a trip around', color:'var(--trail)', itemIds:['e3','r2']},
  {id:'cl4', title:'Japan Essentials', subtitle:'Ritual, rest, and reflection', color:'var(--culture)', itemIds:['c1','w4']}
];
let myLists = [];
const LIST_COLORS = ['var(--trail)','var(--signal)','var(--leisure)','var(--culture)','var(--nature)','var(--brass)'];
function listBeenCount(list){
  return list.itemIds.filter(id => findRankedItemById(id)).length;
}
function generateCountryLists(){
  const groups = {};
  allCatalogItems().forEach(i => {
    const country = i.loc.split(',').pop().trim();
    if(!groups[country]) groups[country] = new Set();
    groups[country].add(i.id);
  });
  return Object.entries(groups).map(([country, idSet], idx) => ({
    id:'cnl-' + country.replace(/[^a-z0-9]+/gi, '-').toLowerCase(),
    title:`Best of ${country}`,
    subtitle:`${idSet.size} place${idSet.size>1?'s':''} to explore`,
    color: LIST_COLORS[idx % LIST_COLORS.length],
    itemIds:[...idSet]
  }));
}
function allLists(){
  return [...curatedLists, ...generateCountryLists(), ...myLists];
}
function renderFeaturedLists(){
  const el = document.getElementById('featured-lists');
  const all = allLists();
  const shown = all.slice(0, 7);
  el.innerHTML = shown.map(l => `
    <div class="list-card" style="--c:${l.color}" data-list="${l.id}">
      <div class="list-card-text">
        <div class="list-card-title">${l.title}</div>
        <div class="list-card-sub">You've been to ${listBeenCount(l)} of ${l.itemIds.length}</div>
      </div>
    </div>`).join('') + `
    <div class="list-card" style="--c:var(--ink); align-items:center; justify-content:center;" id="see-all-lists-card">
      <div class="list-card-text" style="text-align:center;">
        <div class="list-card-title" style="font-size:12px;">See all ${all.length} lists</div>
      </div>
    </div>
    <div class="list-card" style="--c:var(--slate); align-items:center; justify-content:center;" id="new-list-card">
      <div class="list-card-text" style="text-align:center;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" style="width:22px;height:22px; margin-bottom:4px;"><path d="M12 5v14M5 12h14"/></svg>
        <div class="list-card-title" style="font-size:12px;">New list</div>
      </div>
    </div>`;
  el.querySelectorAll('[data-list]').forEach(card => {
    const list = all.find(l => l.id === card.dataset.list);
    card.addEventListener('click', () => openListDetail(list));
  });
  document.getElementById('new-list-card').addEventListener('click', () => openCreateListForm(null));
  document.getElementById('see-all-lists-card').addEventListener('click', openAllLists);
}
function openAllLists(){
  const all = allLists();
  document.getElementById('list-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:4px;">All lists</h3>
    <p class="caption" style="text-align:left; margin-bottom:10px;">${all.length} lists, including one per country you've added places in</p>
    ${all.map(l => `
      <div class="rank-row" data-alllist="${l.id}">
        <div class="tag" style="background:${l.color}; color:#fff; border:none;">${listBeenCount(l)}</div>
        <div class="rank-info">
          <div class="rank-name">${l.title}</div>
          <div class="rank-loc">${l.subtitle} · been to ${listBeenCount(l)} of ${l.itemIds.length}</div>
        </div>
      </div>`).join('')}
    <button class="btn btn-outline btn-block" id="alllists-close" style="margin-top:12px;">Close</button>
  `;
  document.querySelectorAll('[data-alllist]').forEach(row => row.addEventListener('click', () => {
    const list = all.find(l => l.id === row.dataset.alllist);
    openListDetail(list);
  }));
  document.getElementById('alllists-close').addEventListener('click', () => document.getElementById('list-overlay').classList.remove('active'));
  document.getElementById('list-overlay').classList.add('active');
}
function openListDetail(list){
  const isOwnList = myLists.some(l => l.id === list.id);
  const isCurated = curatedLists.some(l => l.id === list.id);
  const isEditable = isOwnList || (isCurated && isAdmin);
  function render(){
    const items = list.itemIds.map(id => findAnyItemById(id)).filter(Boolean);
    document.getElementById('list-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:2px;">${list.title}</h3>
      ${isCurated && isAdmin ? `<div class="admin-badge" style="margin-bottom:6px;">Editing as Admin</div>` : ''}
      <p class="caption" style="text-align:left; margin-bottom:14px;">${list.subtitle} · been to ${listBeenCount(list)} of ${items.length}</p>
      ${isEditable ? `<button class="btn btn-outline btn-block" id="list-add-more" style="margin-bottom:12px;">+ Add activities</button>` : ''}
      <div id="list-detail-inner">${items.length ? items.map(i => `
        <div style="position:relative;">
          ${xcardHTML(i)}
          ${isEditable ? `<button class="photo-remove" data-remove-from-list="${i.id}" style="z-index:2;">✕</button>` : ''}
        </div>`).join('') : `<p class="caption" style="text-align:left;">Nothing in this list yet.</p>`}</div>
      <button class="btn btn-brass btn-block" id="list-close" style="margin-top:8px;">Close</button>
    `;
    document.getElementById('list-overlay').classList.add('active');
    document.getElementById('list-close').addEventListener('click', () => document.getElementById('list-overlay').classList.remove('active'));
    wireDetailClicks(document.getElementById('list-detail-inner'), items);
    const addMoreBtn = document.getElementById('list-add-more');
    if(addMoreBtn) addMoreBtn.addEventListener('click', () => openAddToListPicker(list, render));
    document.querySelectorAll('[data-remove-from-list]').forEach(btn => btn.addEventListener('click', (e) => {
      e.stopPropagation();
      list.itemIds = list.itemIds.filter(id => id !== btn.dataset.removeFromList);
      render();
      renderFeaturedLists();
      toast('Removed from list');
    }));
  }
  render();
}
function openAddToListPicker(list, onDone){
  const allItems = allCatalogItemsForPicker();
  let selected = new Set(list.itemIds);
  let query = '';
  function render(){
    const q = query.trim().toLowerCase();
    const filtered = q ? allItems.filter(i => i.name.toLowerCase().includes(q) || i.loc.toLowerCase().includes(q)) : allItems;
    document.getElementById('newlist-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:4px;">Add to "${list.title}"</h3>
      <div class="search-box" style="margin:8px 0;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="atl-search" placeholder="Search activities to add..." value="${query.replace(/"/g,'&quot;')}">
      </div>
      <p class="caption" style="text-align:left; margin-bottom:6px;">${selected.size} in this list</p>
      <div style="max-height:280px; overflow-y:auto;">
        ${filtered.length ? filtered.map(i => `
          <div class="checkbox-row" data-check="${i.id}">
            <div class="checkbox-box ${selected.has(i.id) ? 'checked' : ''}">${selected.has(i.id) ? CHECK_SVG : ''}</div>
            <div style="flex:1;"><div class="rank-name" style="font-size:12.5px;">${i.name}</div><div class="rank-loc">${i.loc}</div></div>
          </div>`).join('') : `<p class="caption" style="text-align:left;">Nothing matches "${query}".</p>`}
      </div>
      <button class="btn btn-brass btn-block" id="atl-done" style="margin-top:14px;">Done</button>
    `;
    const searchEl = document.getElementById('atl-search');
    searchEl.addEventListener('input', (e) => {
      query = e.target.value;
      const cursorPos = e.target.selectionStart;
      render();
      const freshEl = document.getElementById('atl-search');
      freshEl.focus();
      freshEl.setSelectionRange(cursorPos, cursorPos);
    });
    document.querySelectorAll('[data-check]').forEach(row => row.addEventListener('click', () => {
      const id = row.dataset.check;
      if(selected.has(id)) selected.delete(id); else selected.add(id);
      render();
    }));
    document.getElementById('atl-done').addEventListener('click', () => {
      list.itemIds = [...selected];
      document.getElementById('newlist-overlay').classList.remove('active');
      onDone();
      renderFeaturedLists();
      toast('List updated');
    });
  }
  render();
  document.getElementById('newlist-overlay').classList.add('active');
}
document.getElementById('list-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'list-overlay') document.getElementById('list-overlay').classList.remove('active');
});

const CHECK_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 13l4 4L19 7"/></svg>';

function allCatalogItemsForPicker(){
  const seen = new Set();
  const out = [];
  Object.values(ranked).flat().forEach(i => { if(!seen.has(i.id)){ seen.add(i.id); out.push(i); } });
  Object.values(recs).flat().forEach(i => { if(!seen.has(i.id)){ seen.add(i.id); out.push(i); } });
  return out;
}
function openCreateListForm(prefillItemId){
  const allItems = allCatalogItemsForPicker();
  let selected = new Set(prefillItemId ? [prefillItemId] : []);
  let draftTitle = '';
  let query = '';

  function render(){
    const q = query.trim().toLowerCase();
    const filtered = q ? allItems.filter(i => i.name.toLowerCase().includes(q) || i.loc.toLowerCase().includes(q)) : allItems;
    document.getElementById('newlist-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:12px;">Create a list</h3>
      <div class="field"><label>Title</label><input type="text" id="nl-title" placeholder="e.g. Solo Trip 2027" value="${draftTitle.replace(/"/g,'&quot;')}"></div>
      <div class="sec-label">Include</div>
      <div class="search-box" style="margin-bottom:8px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
        <input type="text" id="nl-search" placeholder="Search activities to add..." value="${query.replace(/"/g,'&quot;')}">
      </div>
      ${selected.size ? `<p class="caption" style="text-align:left; margin-bottom:6px;">${selected.size} selected</p>` : ''}
      <div id="nl-items" style="max-height:280px; overflow-y:auto;">
        ${filtered.length ? filtered.map(i => `
          <div class="checkbox-row" data-check="${i.id}">
            <div class="checkbox-box ${selected.has(i.id) ? 'checked' : ''}">${selected.has(i.id) ? CHECK_SVG : ''}</div>
            <div style="flex:1;"><div class="rank-name" style="font-size:12.5px;">${i.name}</div><div class="rank-loc">${i.loc}</div></div>
          </div>`).join('') : `<p class="caption" style="text-align:left;">Nothing matches "${query}".</p>`}
      </div>
      <button class="btn btn-brass btn-block" id="nl-create" style="margin-top:14px;">Create list</button>
      <button class="btn btn-outline btn-block" id="nl-cancel" style="margin-top:8px;">Cancel</button>
    `;
    const titleEl = document.getElementById('nl-title');
    titleEl.addEventListener('input', (e) => { draftTitle = e.target.value; });
    const searchEl = document.getElementById('nl-search');
    searchEl.addEventListener('input', (e) => {
      query = e.target.value;
      const cursorPos = e.target.selectionStart;
      render();
      const freshSearchEl = document.getElementById('nl-search');
      freshSearchEl.focus();
      freshSearchEl.setSelectionRange(cursorPos, cursorPos);
    });
    document.querySelectorAll('[data-check]').forEach(row => row.addEventListener('click', () => {
      const id = row.dataset.check;
      if(selected.has(id)) selected.delete(id); else selected.add(id);
      render();
    }));
    document.getElementById('nl-cancel').addEventListener('click', () => document.getElementById('newlist-overlay').classList.remove('active'));
    document.getElementById('nl-create').addEventListener('click', () => {
      const title = draftTitle.trim();
      if(!title){ toast('Give your list a title', false); return; }
      if(!selected.size){ toast('Add at least one place', false); return; }
      myLists.push({
        id:'ml' + Date.now(),
        title,
        subtitle:'Your list',
        color: LIST_COLORS[myLists.length % LIST_COLORS.length],
        itemIds:[...selected]
      });
      document.getElementById('newlist-overlay').classList.remove('active');
      renderAll();
      toast(`"${title}" created`);
    });
  }
  render();
  document.getElementById('newlist-overlay').classList.add('active');
}

function openListChooser(item){
  function render(){
    const all = [...curatedLists, ...myLists];
    document.getElementById('newlist-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:4px;">Add to a list</h3>
      <p class="caption" style="text-align:left; margin-bottom:10px;">${item.name}</p>
      ${all.length ? all.map(l => `
        <div class="checkbox-row" data-tolist="${l.id}">
          <div class="checkbox-box ${l.itemIds.includes(item.id) ? 'checked' : ''}">${l.itemIds.includes(item.id) ? CHECK_SVG : ''}</div>
          <div style="flex:1;"><div class="rank-name" style="font-size:12.5px;">${l.title}</div><div class="rank-loc">${l.itemIds.length} places</div></div>
        </div>`).join('') : `<p class="caption" style="text-align:left;">No lists yet.</p>`}
      <button class="btn btn-brass btn-block" id="nl-new-from-chooser" style="margin-top:14px;">+ New list with this</button>
      <button class="btn btn-outline btn-block" id="nl-chooser-close" style="margin-top:8px;">Done</button>
    `;
    document.querySelectorAll('[data-tolist]').forEach(row => row.addEventListener('click', () => {
      const list = all.find(l => l.id === row.dataset.tolist);
      if(list.itemIds.includes(item.id)) list.itemIds = list.itemIds.filter(id => id !== item.id);
      else list.itemIds.push(item.id);
      render();
    }));
    document.getElementById('nl-new-from-chooser').addEventListener('click', () => openCreateListForm(item.id));
    document.getElementById('nl-chooser-close').addEventListener('click', () => {
      document.getElementById('newlist-overlay').classList.remove('active');
      renderFeaturedLists();
    });
  }
  render();
  document.getElementById('newlist-overlay').classList.add('active');
}
document.getElementById('newlist-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'newlist-overlay') document.getElementById('newlist-overlay').classList.remove('active');
});

/* ---- Trips: day-by-day itinerary planning ---- */
let trips = [];
function renderTripsSection(){
  const visibleTrips = offlineMode ? trips.filter(t => t.downloaded) : trips;
  return `
    <div class="sec-label" style="margin-top:0;">Your trips</div>
    ${offlineMode ? `<p class="caption" style="text-align:left; margin-top:-4px;">Offline — only downloaded trips are shown.</p>` : ''}
    ${visibleTrips.length ? visibleTrips.map(t => `
      <div class="rank-row" data-trip="${t.id}">
        <div class="tag" style="background:var(--brass); color:#fff; border:none;">${t.days.length}d</div>
        <div class="rank-info">
          <div class="rank-name">${t.title}${t.downloaded ? '<span class="visibility-pill public" style="margin-left:6px;">Downloaded</span>' : ''}</div>
          <div class="rank-loc">${t.startDate || 'No dates set'}${t.endDate ? ' – ' + t.endDate : ''} · ${t.days.reduce((n,d) => n + d.itemIds.length, 0)} activities planned</div>
          ${friendAvatarStack(t.coPlanners)}
        </div>
      </div>`).join('') : `<p class="caption" style="text-align:left;">${offlineMode ? 'No downloaded trips available offline.' : 'No trips yet — bundle activities into a day-by-day plan for an upcoming trip.'}</p>`}
    <button class="btn btn-brass btn-block" id="new-trip-btn" style="margin-top:12px;" ${offlineMode ? 'disabled' : ''}>+ Plan a trip</button>
  `;
}
function wireTripsSection(){
  document.querySelectorAll('[data-trip]').forEach(row => row.addEventListener('click', () => {
    const trip = trips.find(t => t.id === row.dataset.trip);
    openTripDetail(trip);
  }));
  document.getElementById('new-trip-btn').addEventListener('click', openCreateTripForm);
}
function openCreateTripForm(){
  document.getElementById('trip-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:4px;">Plan a trip</h3>
    <div class="field"><label>Title</label><input type="text" id="trip-title" placeholder="e.g. Two Weeks in New Zealand"></div>
    <div class="field"><label>Start date</label><input type="date" id="trip-start" class="field-select"></div>
    <div class="field"><label>End date</label><input type="date" id="trip-end" class="field-select"></div>
    <p class="caption" style="text-align:left;">We'll build a day-by-day itinerary from your dates (or default to 3 days) — you add activities to each day next.</p>
    <button class="btn btn-brass btn-block" id="trip-create-btn" style="margin-top:10px;">Create trip</button>
    <button class="btn btn-outline btn-block" id="trip-cancel-btn" style="margin-top:8px;">Cancel</button>
  `;
  document.getElementById('trip-overlay').classList.add('active');
  document.getElementById('trip-cancel-btn').addEventListener('click', () => document.getElementById('trip-overlay').classList.remove('active'));
  document.getElementById('trip-create-btn').addEventListener('click', () => {
    const title = document.getElementById('trip-title').value.trim();
    const start = document.getElementById('trip-start').value;
    const end = document.getElementById('trip-end').value;
    if(!title){ toast('Give your trip a title', false); return; }
    let numDays = 3;
    if(start && end){
      const diff = Math.round((new Date(end) - new Date(start)) / 86400000) + 1;
      if(diff > 0) numDays = Math.min(diff, 14);
    }
    const days = Array.from({length: numDays}, (_, i) => ({id:'d'+i, label:'Day '+(i+1), itemIds:[]}));
    const trip = {id:'trip'+Date.now(), title, startDate:start, endDate:end, days, downloaded:false, coPlanners:[]};
    trips.push(trip);
    document.getElementById('trip-overlay').classList.remove('active');
    renderAll();
    openTripDetail(trip);
    toast('Trip created — add activities to each day');
  });
}
function openTripDetail(trip){
  trip.coPlanners = trip.coPlanners || [];
  let activeDayIdx = 0;
  function render(){
    const day = trip.days[activeDayIdx];
    const items = day.itemIds.map(id => findAnyItemById(id)).filter(Boolean);
    document.getElementById('trip-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:2px;">${trip.title}</h3>
      <p class="caption" style="text-align:left; margin-bottom:6px;">${trip.startDate || 'No dates set'}${trip.endDate ? ' – ' + trip.endDate : ''} · ${trip.days.length} days</p>
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:10px;">
        ${friendAvatarStack(trip.coPlanners)}
        <button class="sec-label-action" id="trip-coplanners-btn" style="margin:0;">${trip.coPlanners.length ? 'Manage co-planners' : '+ Add co-planners'}</button>
      </div>
      <div class="pill-nav" style="margin-top:0;">
        ${trip.days.map((d, idx) => `<button class="pill ${idx===activeDayIdx ? 'active' : ''}" data-day="${idx}">${d.label}</button>`).join('')}
      </div>
      <div id="trip-day-stops" style="margin-top:6px;">
        ${items.length ? items.map((i, idx) => `
          <div class="rank-row">
            <div style="display:flex; flex-direction:column; gap:2px; margin-right:4px;">
              <button class="stop-move-btn" data-move-up="${idx}" ${idx===0?'disabled':''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 15l-6-6-6 6"/></svg></button>
              <button class="stop-move-btn" data-move-down="${idx}" ${idx===items.length-1?'disabled':''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></button>
            </div>
            <div class="rank-info"><div class="rank-name">${i.name}</div><div class="rank-loc">${i.loc}</div></div>
            <button class="photo-remove" style="position:static; width:24px; height:24px;" data-remove-stop="${i.id}">✕</button>
          </div>`).join('') : `<p class="caption" style="text-align:left;">Nothing planned for ${day.label} yet.</p>`}
      </div>
      <button class="btn btn-outline btn-block" id="trip-add-activity-btn" style="margin-top:10px;">+ Add activity to ${day.label}</button>
      <button class="btn ${trip.downloaded ? 'btn-brass' : 'btn-outline'} btn-block" id="trip-download-btn" style="margin-top:8px;">${trip.downloaded ? '✓ Downloaded for offline' : 'Download for offline'}</button>
      <button class="btn btn-outline btn-block" id="trip-close-btn" style="margin-top:8px;">Close</button>
    `;
    document.querySelectorAll('[data-day]').forEach(b => b.addEventListener('click', () => { activeDayIdx = Number(b.dataset.day); render(); }));
    document.getElementById('trip-close-btn').addEventListener('click', () => { document.getElementById('trip-overlay').classList.remove('active'); renderAll(); });
    document.getElementById('trip-coplanners-btn').addEventListener('click', () => openCoPlannerPicker(trip, render));
    document.getElementById('trip-download-btn').addEventListener('click', () => {
      trip.downloaded = !trip.downloaded;
      render();
      toast(trip.downloaded ? 'Downloaded for offline' : 'Removed from downloads');
    });
    document.getElementById('trip-add-activity-btn').addEventListener('click', () => openTripActivityPicker(trip, day, render));
    document.querySelectorAll('[data-move-up]').forEach(b => b.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = Number(b.dataset.moveUp);
      if(idx > 0){
        [day.itemIds[idx-1], day.itemIds[idx]] = [day.itemIds[idx], day.itemIds[idx-1]];
        render();
      }
    }));
    document.querySelectorAll('[data-move-down]').forEach(b => b.addEventListener('click', (e) => {
      e.stopPropagation();
      const idx = Number(b.dataset.moveDown);
      if(idx < day.itemIds.length - 1){
        [day.itemIds[idx], day.itemIds[idx+1]] = [day.itemIds[idx+1], day.itemIds[idx]];
        render();
      }
    }));
    document.querySelectorAll('[data-remove-stop]').forEach(b => b.addEventListener('click', (e) => {
      e.stopPropagation();
      const removedId = b.dataset.removeStop;
      const removedIdx = day.itemIds.indexOf(removedId);
      day.itemIds = day.itemIds.filter(id => id !== removedId);
      render();
      toast('Removed from ' + day.label, true, () => {
        day.itemIds.splice(removedIdx, 0, removedId);
        render();
        toast('Restored to ' + day.label);
      });
    }));
  }
  render();
  document.getElementById('trip-overlay').classList.add('active');
}
function openCoPlannerPicker(trip, onDone){
  function render(){
    document.getElementById('newlist-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:4px;">Co-planners for ${trip.title}</h3>
      <p class="caption" style="text-align:left; margin-bottom:10px;">Tag friends to plan this trip together.</p>
      <div class="friend-grid">
        ${FRIENDS.map(f => `<button class="friend-chip ${trip.coPlanners.includes(f.id)?'selected':''}" data-coplanner="${f.id}"><span class="mini-avatar">${f.handle[1].toUpperCase()}</span>${f.name}</button>`).join('')}
      </div>
      <p class="caption" style="text-align:left; margin-top:10px;">Since this is a single-user prototype, tagged co-planners won't actually get shared access — a real build would sync the itinerary to their account too.</p>
      <button class="btn btn-brass btn-block" id="coplanner-done" style="margin-top:12px;">Done</button>
    `;
    document.querySelectorAll('[data-coplanner]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.coplanner;
      const friend = FRIENDS.find(f => f.id === id);
      if(trip.coPlanners.includes(id)){
        trip.coPlanners = trip.coPlanners.filter(x => x !== id);
      } else {
        trip.coPlanners.push(id);
        if(notifSettings.coPlanner && friend){
          notifications.unshift({
            id:'nt' + Date.now(), icon:'invite', type:'coPlanner',
            text: `You added <b>${friend.name}</b> as a co-planner for <b>${trip.title}</b>`,
            time:'just now', read:false
          });
          renderNotifBadge();
        }
      }
      render();
    }));
    document.getElementById('coplanner-done').addEventListener('click', () => {
      document.getElementById('newlist-overlay').classList.remove('active');
      onDone();
    });
  }
  render();
  document.getElementById('newlist-overlay').classList.add('active');
}
function openTripActivityPicker(trip, day, onDone){
  const allItems = allCatalogItems();
  function render(){
    document.getElementById('newlist-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:10px;">Add to ${day.label}</h3>
      ${allItems.map(i => `
        <div class="checkbox-row" data-tripitem="${i.id}">
          <div class="checkbox-box ${day.itemIds.includes(i.id) ? 'checked' : ''}">${day.itemIds.includes(i.id) ? CHECK_SVG : ''}</div>
          <div style="flex:1;"><div class="rank-name" style="font-size:12.5px;">${i.name}</div><div class="rank-loc">${i.loc}</div></div>
        </div>`).join('')}
      <button class="btn btn-brass btn-block" id="tripitem-done" style="margin-top:12px;">Done</button>
    `;
    document.querySelectorAll('[data-tripitem]').forEach(row => row.addEventListener('click', () => {
      const id = row.dataset.tripitem;
      if(day.itemIds.includes(id)) day.itemIds = day.itemIds.filter(x => x !== id);
      else day.itemIds.push(id);
      render();
    }));
    document.getElementById('tripitem-done').addEventListener('click', () => {
      document.getElementById('newlist-overlay').classList.remove('active');
      onDone();
    });
  }
  render();
  document.getElementById('newlist-overlay').classList.add('active');
}
document.getElementById('trip-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'trip-overlay') document.getElementById('trip-overlay').classList.remove('active');
});

/* ---- Guides: richer written content than a flat list ---- */
let guidesSubTab = 'official';
let guides = [
  {
    id:'gd1', title:'3 Days in Kyoto', color:'var(--culture)', type:'official', author:'Jaunt Editorial',
    subtitle:'A slow, ritual-heavy itinerary',
    body:"Kyoto rewards patience. Spend your first morning at a quiet teahouse before the crowds arrive — the ceremony is as much about the pauses as the tea itself. Afternoons are for wandering the machiya-lined backstreets away from the main temple circuit; the city's best moments tend to happen between the landmarks, not at them. By evening, find a counter-seat izakaya and let the night move slowly.",
    itemIds:['c1','w4']
  },
  {
    id:'gd2', title:'New Zealand Adventure Guide', color:'var(--signal)', type:'official', author:'Jaunt Editorial',
    subtitle:'South Island, adrenaline-forward',
    body:"Queenstown is the obvious base, but don't let the adrenaline-tourism gloss fool you — the jumps and swings are genuinely worth it, and the town empties out fast once you're ten minutes outside it. Pair a big-ticket thrill day with something slower and wilder nearby; the coastline north of town rewards travelers who budget an extra day for weather delays, since boats don't go out in a swell.",
    itemIds:['a1','n3']
  },
  {
    id:'gd3', title:"Nina's Patagonia Trek Notes", color:'var(--nature)', type:'community', author:'Nina Rodrigues',
    subtitle:'From a power user with 34 places logged',
    body:"Torres del Paine is worth the logistics headache. Book the refugios months ahead if you're not camping — they sell out faster than people expect. The W trek gets all the attention, but if you have an extra two days, the full O circuit loses most of the crowds after day two.",
    itemIds:['r2']
  }
];
function renderGuidesTab(){
  const filtered = guides.filter(g => g.type === guidesSubTab);
  document.getElementById('guides-subtab-pills').innerHTML = `
    <button class="pill ${guidesSubTab==='official'?'active':''}" data-guidesub="official">Official Blueprints</button>
    <button class="pill ${guidesSubTab==='community'?'active':''}" data-guidesub="community">Community Journals</button>`;
  document.querySelectorAll('[data-guidesub]').forEach(b => b.addEventListener('click', () => {
    guidesSubTab = b.dataset.guidesub;
    renderGuidesTab();
  }));
  const el = document.getElementById('guides-content');
  el.innerHTML = filtered.length ? filtered.map(g => `
    <div class="rank-row" data-guide-open="${g.id}">
      <div class="tag" style="background:${g.color}; color:#fff; border:none;">${g.itemIds.length}</div>
      <div class="rank-info">
        <div class="rank-name">${g.title}</div>
        <div class="rank-loc">${g.subtitle}${g.author ? ` · by ${g.author}` : ''}</div>
      </div>
    </div>`).join('') : `<div class="empty"><p>${guidesSubTab === 'official' ? 'No staff guides yet.' : 'No community guides yet — these come from your highest-ranking power users.'}</p></div>`;
  el.querySelectorAll('[data-guide-open]').forEach(row => row.addEventListener('click', () => {
    const guide = guides.find(g => g.id === row.dataset.guideOpen);
    if(guide) openGuideDetail(guide);
  }));
}
function openGuideDetail(guide){
  const items = guide.itemIds.map(id => findAnyItemById(id)).filter(Boolean);
  document.getElementById('guide-modal').innerHTML = `
    <div style="height:70px; border-radius:12px; background:${guide.color}; margin-bottom:14px;"></div>
    <h3 style="font-family:'Fraunces',serif; font-size:19px; color:var(--ink); margin-bottom:2px;">${guide.title}</h3>
    <p class="caption" style="text-align:left; margin-bottom:12px;">${guide.subtitle}</p>
    <p style="font-size:13px; color:var(--ink); line-height:1.6; margin-bottom:16px;">${guide.body}</p>
    <div class="sec-label" style="margin-top:0;">Places in this guide</div>
    <div id="guide-items-inner">${items.map(i => xcardHTML(i)).join('')}</div>
    <button class="btn btn-brass btn-block" id="guide-close" style="margin-top:10px;">Close</button>
  `;
  document.getElementById('guide-overlay').classList.add('active');
  document.getElementById('guide-close').addEventListener('click', () => document.getElementById('guide-overlay').classList.remove('active'));
  wireDetailClicks(document.getElementById('guide-items-inner'), items);
}
document.getElementById('guide-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'guide-overlay') document.getElementById('guide-overlay').classList.remove('active');
});

/* ---- Search ---- */
function allCatalogItems(){
  let out = [];
  Object.keys(ranked).forEach(cat => ranked[cat].forEach(i => out.push({...i, category:cat, bucket:'Been'})));
  Object.keys(wantToTry).forEach(cat => wantToTry[cat].forEach(i => out.push({...i, category:cat, bucket:'Want to try'})));
  Object.keys(recs).forEach(cat => recs[cat].forEach(i => out.push({...i, category:cat, bucket:'Recommended'})));
  return out;
}
let searchFilter = 'all';
function renderSearchResults(query){
  const el = document.getElementById('search-results');
  const filterRow = document.getElementById('search-filter-row');
  const searchMain = document.getElementById('search-main');
  if(!query.trim()){
    el.innerHTML = '';
    filterRow.style.display = 'none';
    searchMain.style.display = 'block';
    return;
  }
  searchMain.style.display = 'none';
  filterRow.style.display = 'flex';
  filterRow.innerHTML = ['all','activities','people'].map(f =>
    `<button class="pill ${searchFilter===f ? 'active':''}" data-searchfilter="${f}">${f === 'all' ? 'All' : f === 'activities' ? 'Activities' : 'People'}</button>`
  ).join('');
  filterRow.querySelectorAll('[data-searchfilter]').forEach(b => b.addEventListener('click', () => {
    searchFilter = b.dataset.searchfilter;
    renderSearchResults(query);
  }));

  const q = query.trim().toLowerCase();
  const results = searchFilter === 'people' ? [] : allCatalogItems().filter(i =>
    i.name.toLowerCase().includes(q) ||
    i.loc.toLowerCase().includes(q) ||
    (i.tags && i.tags.some(t => t.toLowerCase().includes(q)))
  );
  const people = searchFilter === 'activities' ? [] : FRIENDS.filter(f => f.handle.toLowerCase().includes(q));

  const peopleHTML = people.length ? `
    <div class="sec-label" style="margin-top:0;">People</div>
    ${people.map(f => `
      <div class="person-result-row" data-person="${f.id}">
        <span class="mini-avatar" style="width:32px; height:32px; font-size:11px;">${f.handle[1].toUpperCase()}</span>
        <div style="flex:1;"><div class="search-result-name">${f.handle}</div></div>
        <span class="visibility-pill ${f.public ? 'public' : 'private'}">${f.public ? 'Public' : 'Private'}</span>
      </div>`).join('')}
    ${searchFilter === 'all' ? `<div class="sec-label">Activities & places</div>` : ''}` : '';

  const resultsHTML = searchFilter === 'people' ? '' : (results.length ? results.map(i => `
    <div class="search-result-row" data-open-id="${i.id}">
      <div style="width:34px;height:34px;border-radius:8px;flex-shrink:0;${mediaStyle(i.category, i.photo)}"></div>
      <div style="flex:1;">
        <div class="search-result-name">${i.name}</div>
        <div class="search-result-loc">${i.loc}</div>
      </div>
      <span class="search-badge">${i.bucket}</span>
    </div>`).join('') : `<div class="empty" style="padding:24px 10px 10px;"><p>Nothing matches "${query}"</p></div>`);

  const noPeopleMatch = searchFilter === 'people' && !people.length;

  const requestRow = `
    <div class="request-add-row" id="request-add-btn">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>
      <span>Can't find <b>"${query}"</b>? <span class="request-add-link">Request to add it</span></span>
    </div>`;

  el.innerHTML = (noPeopleMatch ? `<div class="empty" style="padding:24px 10px 10px;"><p>No people match "${query}"</p></div>` : '') + peopleHTML + resultsHTML + requestRow;
  wireDetailClicks(el, results);
  document.querySelectorAll('[data-person]').forEach(row => row.addEventListener('click', () => {
    const friend = FRIENDS.find(f => f.id === row.dataset.person);
    openPublicProfile(friend);
  }));
  document.getElementById('request-add-btn').addEventListener('click', () => {
    openSubmitModal(query.trim());
  });
}

/* ---- Leaderboard ---- */
const LB_FRIENDS = [
  {handle:'@nina.r', name:'Nina Rodrigues', count:34, influence:812, match:71},
  {handle:'@alex.p', name:'Alex Park', count:29, influence:640, match:58},
  {handle:'@sofia.k', name:'Sofia Kappas', count:22, influence:455, match:64},
  {handle:'@maya_t', name:'Maya Torres', count:19, influence:390, match:82},
  {handle:'@jonasw', name:'Jonas Weber', count:14, influence:301, match:49}
];
let lbMetric = 'been';
let lbScope = 'all';
function computeMyLeaderboardStats(){
  const allRanked = Object.values(ranked).flat();
  const notesCount = allRanked.filter(i => i.note && i.note.trim()).length;
  const photosCount = allRanked.reduce((n, i) => n + (i.photos ? i.photos.length : (i.photo ? 1 : 0)), 0);
  const myInfluence = feedPosts.filter(p => p.friend === '@you').reduce((n, p) => n + (p.likes || 0) + (p.comments ? p.comments.length : 0) * 3, 0);
  return { been: allRanked.length, influence: myInfluence, notes: notesCount, photos: photosCount };
}
function renderLeaderboard(){
  const myStats = computeMyLeaderboardStats();
  const you = { handle:'You', name: myName || 'You', isYou:true, been: myStats.been, influence: myStats.influence, notes: myStats.notes, photos: myStats.photos, match: 100 };
  const friendsAsRows = LB_FRIENDS.map(f => ({ ...f, been: f.count, notes: Math.round(f.count * 0.4), photos: Math.round(f.count * 0.6) }));
  let all = [...friendsAsRows, you];
  if(lbScope === 'friends') all = all.filter(p => p.isYou || youFollowing.has((FRIENDS.find(fr => fr.handle === p.handle) || {}).id));
  all = all.sort((a,b) => b[lbMetric] - a[lbMetric]);
  const medalClass = ['gold','silver','bronze'];
  const metricLabel = {been:'Places logged', influence:'Influence', notes:'Notes written', photos:'Photos added'};
  const tabs = ['been','influence','notes','photos'];

  return `
    <div class="pill-nav" id="lb-metric-pills" style="margin-top:0;">
      ${tabs.map(t => `<button class="pill ${lbMetric===t?'active':''}" data-lbmetric="${t}">${t[0].toUpperCase()+t.slice(1)}</button>`).join('')}
    </div>
    <div class="admin-toggle-row" style="margin-bottom:12px;">
      <span>Filter</span>
      <div style="display:flex; gap:6px; flex-shrink:0;">
        <button class="role-pill ${lbScope==='all'?'active':''}" data-lbscope="all">All Members</button>
        <button class="role-pill ${lbScope==='friends'?'active':''}" data-lbscope="friends">Following</button>
      </div>
    </div>
    <div class="sec-label" style="margin-top:0;">${metricLabel[lbMetric]}</div>
    ${all.map((p, idx) => `
      <div class="lb-row ${p.isYou ? 'lb-you' : ''}">
        <div class="lb-rank ${medalClass[idx] || ''}">${idx+1}</div>
        <span class="mini-avatar">${p.name[0].toUpperCase()}</span>
        <div style="flex:1;">
          <div style="font-size:13px; font-weight:${p.isYou?'700':'500'}; color:var(--ink);">${p.name}</div>
          ${!p.isYou ? `<div class="caption" style="margin:0; color:var(--trail); cursor:pointer; text-decoration:underline;" data-comparefriend="${p.handle}">+${p.match}% Match</div>` : ''}
        </div>
        <div class="lb-stat">${p[lbMetric]}</div>
      </div>`).join('')}
    <p class="caption" style="margin-top:10px; text-align:left;">Friend counts and match % are illustrative — a real build would pull these from actual accounts and shared ranking history.</p>
  `;
}
function wireLeaderboard(){
  document.querySelectorAll('[data-lbmetric]').forEach(b => b.addEventListener('click', () => { lbMetric = b.dataset.lbmetric; renderProfileTab(); }));
  document.querySelectorAll('[data-lbscope]').forEach(b => b.addEventListener('click', () => { lbScope = b.dataset.lbscope; renderProfileTab(); }));
  document.querySelectorAll('[data-comparefriend]').forEach(el => el.addEventListener('click', (e) => {
    e.stopPropagation();
    const f = LB_FRIENDS.find(x => x.handle === el.dataset.comparefriend);
    if(f) openTasteComparison(f);
  }));
}
function mockFriendCategoryBreakdown(friend){
  const cats = Object.keys(LABELS);
  const seed = friend.handle.split('').reduce((s,c) => s + c.charCodeAt(0), 0) + friend.count;
  const weights = cats.map((c, i) => 0.6 + ((seed * (i + 1)) % 5) / 5);
  const total = weights.reduce((a,b) => a+b, 0);
  return cats.map((c, i) => ({ cat:c, count: Math.max(0, Math.round(friend.count * (weights[i] / total))) }));
}
function openTasteComparison(friend){
  const theirs = mockFriendCategoryBreakdown(friend);
  document.getElementById('newlist-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:17px; color:var(--ink); margin-bottom:2px;">Taste comparison</h3>
    <p class="caption" style="text-align:left; margin-bottom:12px;">You vs. ${friend.name} — by category</p>
    <div style="display:flex; padding:0 4px 8px; font-family:'IBM Plex Mono', monospace; font-size:9.5px; text-transform:uppercase; color:var(--slate);">
      <div style="flex:1;">Category</div>
      <div style="width:44px; text-align:center;">You</div>
      <div style="width:44px; text-align:center;">${friend.name.split(' ')[0]}</div>
    </div>
    ${Object.keys(LABELS).map(cat => {
      const yours = categoryRankCount(cat);
      const theirCount = theirs.find(t => t.cat === cat).count;
      const youSpecialist = yours >= SPECIALIST_THRESHOLD;
      const theySpecialist = theirCount >= SPECIALIST_THRESHOLD;
      return `<div class="stat-row" style="flex-direction:column; align-items:stretch;">
        <div style="display:flex; align-items:center;">
          <div class="stat-label" style="flex:1; display:flex; align-items:center; gap:6px;">${ICONS[cat]}${LABELS[cat]}</div>
          <div style="width:44px; text-align:center; font-weight:700; color:var(--ink);">${yours}</div>
          <div style="width:44px; text-align:center; font-weight:700; color:var(--ink);">${theirCount}</div>
        </div>
        ${youSpecialist || theySpecialist ? `<div class="caption" style="text-align:left; margin-top:2px; color:var(--brass-dark);">
          ${youSpecialist ? `You: ${SPECIALIST_NAMES[cat]} badge` : ''}${youSpecialist && theySpecialist ? ' · ' : ''}${theySpecialist ? `${friend.name.split(' ')[0]}: ${SPECIALIST_NAMES[cat]} badge` : ''}
        </div>` : ''}
      </div>`;
    }).join('')}
    <p class="caption" style="margin-top:10px; text-align:left;">Their breakdown is illustrative — a real build would compare actual shared ranking history.</p>
    <button class="btn btn-brass btn-block" id="compare-close" style="margin-top:12px;">Close</button>
  `;
  document.getElementById('newlist-overlay').classList.add('active');
  document.getElementById('compare-close').addEventListener('click', () => document.getElementById('newlist-overlay').classList.remove('active'));
}

/* ---- Streaks ---- */
function computeStreakMonths(){
  const months = ['Mar 2026','Apr 2026','May 2026','Jun 2026','Jul 2026','Aug 2026'];
  const allRanked = Object.values(ranked).flat();
  const active = new Set();
  allRanked.forEach(i => {
    if(!i.lastVisited) return;
    if(i.lastVisited === 'today') active.add('Aug 2026');
    else months.forEach(m => { if(i.lastVisited.includes(m.split(' ')[0])) active.add(m); });
  });
  return months.map(m => ({label: m.split(' ')[0], active: active.has(m)}));
}
function currentStreak(){
  const months = computeStreakMonths();
  let streak = 0;
  for(let i = months.length - 1; i >= 0; i--){
    if(months[i].active) streak++; else break;
  }
  return streak;
}
function renderStreaksSection(){
  const months = computeStreakMonths();
  const streak = currentStreak();
  return `
    <div style="text-align:center; margin:6px 0 4px;">
      <div style="font-family:'Fraunces',serif; font-weight:700; font-size:40px; color:var(--ink);">${streak}</div>
      <div class="caption" style="margin-top:-2px;">month${streak===1?'':'s'} logging streak</div>
    </div>
    <div class="sec-label">Last 6 months</div>
    <div style="display:flex; gap:8px; justify-content:space-between; margin-top:6px;">
      ${months.map(m => `
        <div style="text-align:center; flex:1;">
          <div style="width:100%; aspect-ratio:1; border-radius:8px; background:${m.active ? 'var(--trail)' : 'var(--parchment-2)'}; display:flex; align-items:center; justify-content:center;">
            ${m.active ? '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" style="width:14px;height:14px;"><path d="M5 13l4 4L19 7"/></svg>' : ''}
          </div>
          <div class="caption" style="margin-top:4px;">${m.label}</div>
        </div>`).join('')}
    </div>
    <p class="caption" style="margin-top:14px; text-align:left;">Estimated from the "last visited" dates on your logged activities — a real build would track this from precise timestamps rather than month labels.</p>
  `;
}

/* ---- Activity: percentile card + monthly calendar ---- */
let calendarMonthOffset = 0;
function getLoggedDatesMap(){
  const allRanked = Object.values(ranked).flat();
  const map = {};
  allRanked.forEach(item => {
    const dates = new Set();
    if(item.loggedDate) dates.add(item.loggedDate);
    (item.visitDates || []).forEach(d => dates.add(d));
    dates.forEach(d => {
      (map[d] || (map[d] = [])).push(item);
    });
  });
  return map;
}

function renderActivitySection(){
  const allRanked = Object.values(ranked).flat();
  const totalLogged = allRanked.length;
  const categoriesUsed = Object.keys(ranked).filter(c => ranked[c].length > 0).length;
  const percentile = Math.max(1, Math.min(50, Math.round(50 - totalLogged * 3)));
  const morePctThan = Math.max(50, Math.min(99, 100 - percentile));

  const now = new Date();
  const viewDate = new Date(now.getFullYear(), now.getMonth() + calendarMonthOffset, 1);
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const monthLabel = viewDate.toLocaleString('default', {month:'short', year:'numeric'});
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, month, 1).getDay();
  const seed = year * 100 + month + 1;
  function seededRand(n){ return ((seed * 9301 + 49297 * (n + 1)) % 233280) / 233280; }
  const photos = allRanked.flatMap(i => (i.photos || []).map(p => p.src));

  const loggedDatesMap = getLoggedDatesMap();
  const hasRealData = Object.keys(loggedDatesMap).length > 0;

  let activeDays = 0, monthTotal = 0;
  let dayCells = '';
  for(let i = 0; i < firstDayOfWeek; i++) dayCells += `<div class="cal-day cal-day-empty"></div>`;
  for(let d = 1; d <= daysInMonth; d++){
    let hasActivity, count, photo;
    if(hasRealData){
      const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
      const realItems = loggedDatesMap[dateStr] || [];
      hasActivity = realItems.length > 0;
      count = realItems.length;
      const withPhoto = realItems.find(i => i.photos && i.photos[0]);
      photo = withPhoto ? withPhoto.photos[0].src : null;
    } else {
      const r = seededRand(d);
      hasActivity = r > 0.72;
      count = hasActivity ? 1 + Math.floor(r * 4) : 0;
      photo = hasActivity && photos.length ? photos[(d + seed) % photos.length] : null;
    }
    if(hasActivity){ activeDays++; monthTotal += count; }
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const clickable = hasRealData && hasActivity;
    dayCells += `<div class="cal-day ${hasActivity ? 'has-activity' : ''} ${clickable ? 'cal-day-clickable' : ''}" ${clickable ? `data-cal-day="${dateStr}"` : ''} style="${photo ? `background-image:url(${photo}); background-size:cover; background-position:center;` : ''}">
      ${count > 0 ? `<span class="cal-day-count">${count}</span>` : ''}
      <span class="cal-day-num">${d}</span>
    </div>`;
  }

  return `
    <div class="sec-label" style="margin-top:0;">Last 30 days</div>
    <div class="percentile-card">
      <div class="percentile-label">LAST 30 DAYS</div>
      <div class="percentile-title">Top ${percentile}% Traveler</div>
      <div class="percentile-stats">
        <div><div class="percentile-num">${totalLogged}</div><div class="percentile-stat-label">Activities</div></div>
        <div><div class="percentile-num">${categoriesUsed}</div><div class="percentile-stat-label">Categories</div></div>
      </div>
      <div class="percentile-footer">More active than ${morePctThan}% of travelers</div>
      <div class="percentile-brand">Ja<span>unt</span></div>
    </div>

    <div class="sec-label">Activity calendar</div>
    <div class="calendar-card">
      <div class="calendar-header">
        <button id="cal-prev" aria-label="Previous month"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 18l-6-6 6-6"/></svg></button>
        <span>${monthLabel}</span>
        <button id="cal-next" aria-label="Next month" ${calendarMonthOffset >= 0 ? 'disabled' : ''}><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></button>
      </div>
      <div class="calendar-stats-row">
        <span><b>${activeDays}</b> days active</span>
        <span><b>${monthTotal}</b> logged</span>
      </div>
      <div class="calendar-dow-row">${['S','M','T','W','T','F','S'].map(d => `<span>${d}</span>`).join('')}</div>
      <div class="calendar-grid">${dayCells}</div>
    </div>
    <p class="caption" style="margin-top:10px; text-align:left;">${hasRealData
      ? 'Built from the date you pick when ranking or logging a revisit. Older entries from before this existed won\'t appear here.'
      : 'Illustrative — once you rank something and pick a date, this calendar will use that real date instead.'}</p>
  `;
}
function wireActivitySection(){
  document.getElementById('cal-prev').addEventListener('click', () => { calendarMonthOffset--; renderProfileTab(); });
  const nextBtn = document.getElementById('cal-next');
  if(!nextBtn.disabled) nextBtn.addEventListener('click', () => { calendarMonthOffset++; renderProfileTab(); });
  const loggedDatesMap = getLoggedDatesMap();
  document.querySelectorAll('[data-cal-day]').forEach(cell => cell.addEventListener('click', () => {
    const items = loggedDatesMap[cell.dataset.calDay] || [];
    if(items.length === 1){
      openDetail(items[0]);
    } else if(items.length > 1){
      openCalDayChooser(cell.dataset.calDay, items);
    }
  }));
}
function openCalDayChooser(dateStr, items){
  const label = new Date(dateStr + 'T00:00:00').toLocaleDateString('en-US', {month:'long', day:'numeric', year:'numeric'});
  document.getElementById('newlist-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:10px;">${label}</h3>
    ${items.map(i => `
      <div class="rank-row" data-calchoose="${i.id}" style="cursor:pointer;">
        ${i.score != null ? scoreChipForItem(i, true) : ''}
        <div class="rank-info"><div class="rank-name">${i.name}</div><div class="rank-loc">${i.loc}</div></div>
      </div>`).join('')}
    <button class="btn btn-outline btn-block" id="caldc-close" style="margin-top:12px;">Close</button>
  `;
  document.getElementById('newlist-overlay').classList.add('active');
  document.querySelectorAll('[data-calchoose]').forEach(row => row.addEventListener('click', () => {
    const item = items.find(i => i.id === row.dataset.calchoose);
    document.getElementById('newlist-overlay').classList.remove('active');
    if(item) openDetail(item);
  }));
  document.getElementById('caldc-close').addEventListener('click', () => document.getElementById('newlist-overlay').classList.remove('active'));
}

/* ---- Real-world map: equirectangular projection from actual coordinates ---- */
const MAP_W = 720, MAP_H = 360;
function project(lon, lat){
  return [ (lon + 180) * (MAP_W/360), (90 - lat) * (MAP_H/180) ];
}
function smoothClosedPath(points){
  if(points.length < 3) return '';
  const n = points.length;
  let d = `M ${points[0][0].toFixed(1)},${points[0][1].toFixed(1)}`;
  for(let i=0;i<n;i++){
    const p0 = points[(i-1+n)%n], p1 = points[i], p2 = points[(i+1)%n], p3 = points[(i+2)%n];
    const c1x = p1[0] + (p2[0]-p0[0])/6, c1y = p1[1] + (p2[1]-p0[1])/6;
    const c2x = p2[0] - (p3[0]-p1[0])/6, c2y = p2[1] - (p3[1]-p1[1])/6;
    d += ` C ${c1x.toFixed(1)},${c1y.toFixed(1)} ${c2x.toFixed(1)},${c2y.toFixed(1)} ${p2[0].toFixed(1)},${p2[1].toFixed(1)}`;
  }
  return d + ' Z';
}
// [lon, lat] control points — simplified silhouettes anchored to real coordinates, smoothed for a field-journal look
const CONTINENTS = {
  northAmerica: [[-168,66],[-140,70],[-100,72],[-80,63],[-65,50],[-70,42],[-75,35],[-80,26],[-88,30],[-97,26],[-90,16],[-83,9],[-88,14],[-105,22],[-112,28],[-117,32],[-124,42],[-130,55],[-150,60],[-168,66]],
  southAmerica: [[-77,7],[-60,10],[-50,0],[-38,-5],[-35,-9],[-38,-15],[-40,-20],[-48,-25],[-57,-35],[-62,-40],[-65,-45],[-68,-52],[-70,-54],[-72,-52],[-71,-40],[-70,-25],[-71,-15],[-78,-5],[-77,7]],
  europe: [[-9,37],[-9,43],[-9,53],[-5,58],[5,62],[15,68],[25,70],[30,60],[40,55],[30,45],[24,40],[20,40],[12,38],[8,44],[3,43],[-9,37]],
  africa: [[-17,15],[-17,21],[10,37],[20,33],[32,31],[35,28],[43,12],[51,10],[45,-1],[40,-10],[35,-20],[27,-33],[20,-34],[15,-27],[12,-18],[9,4],[-5,5],[-10,6],[-17,15]],
  madagascar: [[43,-12],[49,-15],[47,-25],[44,-23],[43,-12]],
  asia: [[40,42],[50,45],[60,55],[70,65],[90,73],[140,73],[170,66],[160,55],[140,45],[130,38],[122,31],[110,20],[102,10],[100,7],[95,5],[92,15],[88,22],[80,7],[77,8],[72,20],[67,24],[61,25],[55,25],[45,30],[35,35],[40,42]],
  australia: [[113,-22],[122,-18],[136,-12],[145,-15],[153,-28],[150,-37],[140,-38],[131,-32],[115,-34],[113,-22]],
  newZealand: [[173,-35],[178,-38],[174,-41],[166,-46],[169,-44],[173,-35]],
  japan: [[130,32],[132,34],[138,36],[141,39],[142,43],[139,41],[135,35],[130,32]]
};
function continentPaths(){
  return Object.values(CONTINENTS).map(pts => {
    const projected = pts.map(([lon,lat]) => project(lon,lat));
    return `<path d="${smoothClosedPath(projected)}"/>`;
  }).join('');
}

const COORDS = {
  e1: {lon:34.83, lat:38.64},    // Cappadocia, Türkiye
  e3: {lon:83.95, lat:28.24},    // Sarangkot, Nepal
  n1: {lon:15.62, lat:44.86},    // Plitvice, Croatia
  n2: {lon:34.83, lat:-2.33},    // Serengeti, Tanzania
  n3: {lon:173.68, lat:-42.40},  // Kaikoura, New Zealand
  a1: {lon:168.66, lat:-45.03},  // Queenstown, New Zealand
  a2: {lon:-84.82, lat:10.30},   // Monteverde, Costa Rica
  l1: {lon:-22.45, lat:63.88},   // Blue Lagoon, Iceland
  l2: {lon:25.43, lat:36.39},    // Santorini, Greece
  c1: {lon:135.77, lat:35.01},   // Kyoto, Japan
  w1: {lon:89.42, lat:27.49},    // Paro, Bhutan
  w2: {lon:18.96, lat:69.65},    // Tromsø, Norway
  w3: {lon:7.87, lat:46.69},     // Interlaken, Switzerland
  w4: {lon:139.03, lat:35.23},   // Hakone, Japan
  w5: {lon:109.27, lat:34.38},   // Xi'an, China
  w6: {lon:-112.17, lat:37.62},  // Bryce Canyon, Utah, USA
  r1: {lon:-6.91, lat:62.00},    // Faroe Islands
  r2: {lon:-73.03, lat:-50.95},  // Patagonia, Chile
  r3: {lon:25.86, lat:-17.92},   // Victoria Falls, Zambia
  r4: {lon:14.48, lat:40.63},    // Positano, Italy
  r5: {lon:-5.00, lat:34.06}     // Fes, Morocco
};
function haversineKm(a, b){
  const R = 6371;
  const dLat = (b.lat - a.lat) * Math.PI/180;
  const dLon = (b.lon - a.lon) * Math.PI/180;
  const s = Math.sin(dLat/2)**2 + Math.cos(a.lat*Math.PI/180)*Math.cos(b.lat*Math.PI/180)*Math.sin(dLon/2)**2;
  return R * 2 * Math.atan2(Math.sqrt(s), Math.sqrt(1-s));
}
function computeBeenPins(){
  return Object.keys(COORDS).filter(id => findRankedItemById(id)).map(id => ({id, ...COORDS[id]}));
}
function findRankedItemById(id){
  for(const cat of Object.keys(ranked)){
    if(ranked[cat].find(i => i.id === id)) return true;
  }
  return false;
}
function findRankedItem(id){
  for(const cat of Object.keys(ranked)){
    const hit = ranked[cat].find(i => i.id === id);
    if(hit) return {...hit, category:cat};
  }
  return null;
}
let profileSubTab = 'been';
let breakdownSubTab = 'activities';
let breakdownSort = 'count';

function tierForScore(score){
  for(const key of Object.keys(TIERS_META)){
    const [min, max] = TIERS_META[key].range;
    if(score >= min && score <= max) return key;
  }
  return 'fine';
}
function avgCircle(score){
  const tier = tierForScore(score);
  return `<div class="avg-circle" style="--c:${TIERS_META[tier].color}">${score.toFixed(1)}</div>`;
}
function computeBreakdown(type){
  let allItems = [];
  Object.keys(ranked).forEach(cat => ranked[cat].forEach(i => allItems.push({...i, category:cat})));

  const groups = {};
  allItems.forEach(i => {
    let key;
    if(type === 'activities') key = LABELS[i.category];
    else if(type === 'cities') key = i.loc.split(',')[0].trim();
    else key = i.loc.split(',').pop().trim();
    if(!groups[key]) groups[key] = { label:key, items:[], category: type==='activities' ? i.category : null };
    groups[key].items.push(i);
  });

  let arr = Object.values(groups).map(g => {
    const sortedItems = [...g.items].sort((a,b) => b.score - a.score);
    return {
      label: g.label,
      count: sortedItems.length,
      avg: round1(sortedItems.reduce((s,i) => s + i.score, 0) / sortedItems.length),
      items: sortedItems,
      category: g.category
    };
  });
  arr.sort((a,b) => breakdownSort === 'count' ? (b.count - a.count) : (b.avg - a.avg));
  return arr;
}

/* ---------------- HELPERS ---------------- */
let toastTimer = null;
function toast(msg, icon=true, undoFn=null){
  const t = document.getElementById('toast');
  if(toastTimer) clearTimeout(toastTimer);
  t.innerHTML = (icon ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>' : '')
    + '<span>'+msg+'</span>'
    + (undoFn ? '<button id="toast-undo-btn" style="background:none;border:none;color:var(--brass);font-family:\'IBM Plex Mono\',monospace;font-size:11px;font-weight:700;text-transform:uppercase;cursor:pointer;margin-left:4px;">Undo</button>' : '');
  t.classList.add('show');
  if(undoFn){
    document.getElementById('toast-undo-btn').addEventListener('click', () => {
      undoFn();
      t.classList.remove('show');
    });
  }
  toastTimer = setTimeout(()=> t.classList.remove('show'), undoFn ? 5000 : 2400);
}

function xcardHTML(item, showRank){
  const photo = item.photo;
  const cat = item.category || currentCategory;
  return `<div class="xcard" data-open-id="${item.id}">
    <div class="xcard-media" style="${mediaStyle(cat, photo)}">${photo ? '' : itemArt(item, cat)}</div>
    <div class="xcard-body">
      <div class="xcard-top">
        <div>
          <div class="xcard-name">${item.name}</div>
          <div class="xcard-loc">${item.loc}${item.price ? ` · <span class="price-tier">${priceSymbols(item.price)}</span>` : ''}</div>
        </div>
        ${item.score != null ? scoreChipForItem(item, true) : ''}
      </div>
      <div class="xcard-blurb">${item.blurb}</div>
      ${renderTags(item)}
      ${friendAvatarStack(item.friends)}
    </div>
  </div>`;
}

function rankRowHTML(item, idx, showReorder){
  return `<div class="rank-row" data-open-id="${item.id}">
    ${showReorder ? `
    <div style="display:flex; flex-direction:column; gap:2px; margin-right:2px;">
      <button class="stop-move-btn" data-rank-move-up="${item.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M18 15l-6-6-6 6"/></svg></button>
      <button class="stop-move-btn" data-rank-move-down="${item.id}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M6 9l6 6 6-6"/></svg></button>
    </div>` : ''}
    <div class="tag">#${idx+1}</div>
    ${item.score != null ? scoreChipForItem(item) : ''}
    ${item.photo ? `<img class="row-thumb" src="${item.photo}">` : ''}
    <div class="rank-info">
      <div class="rank-name">${item.name}</div>
      <div class="rank-loc">${item.loc}${item.visits ? ` · ${item.visits} visit${item.visits>1?'s':''}` : ''}</div>
      ${friendAvatarStack(item.friends)}
    </div>
  </div>`;
}
function wireRankRowReorder(containerEl, category){
  containerEl.querySelectorAll('[data-rank-move-up]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    moveRankedItem(category, btn.dataset.rankMoveUp, -1);
  }));
  containerEl.querySelectorAll('[data-rank-move-down]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    moveRankedItem(category, btn.dataset.rankMoveDown, 1);
  }));
}

function wireDetailClicks(containerEl, items){
  containerEl.querySelectorAll('[data-open-id]').forEach(el => {
    const item = items.find(i => i.id === el.dataset.openId);
    if(item) el.addEventListener('click', () => openDetail(item));
  });
}

function findItemCategory(id){
  for(const cat of Object.keys(ranked)){
    if(ranked[cat].some(i => i.id === id)) return cat;
  }
  return null;
}

function isBookmarked(id){
  return Object.values(wantToTry).some(arr => arr.some(i => i.id === id));
}
function removeBookmark(item){
  let removedFromCat = null;
  Object.keys(wantToTry).forEach(cat => {
    if(wantToTry[cat].some(i => i.id === item.id)) removedFromCat = cat;
    wantToTry[cat] = wantToTry[cat].filter(i => i.id !== item.id);
  });
  openDetail(item);
  renderAll();
  toast('Removed from Want to try', true, () => {
    if(removedFromCat){
      const list = wantToTry[removedFromCat] || (wantToTry[removedFromCat] = []);
      list.push({...item, category: removedFromCat});
      openDetail(item);
      renderAll();
      toast('Restored to Want to try');
    }
  });
}
function startRankingFromDetail(item){
  if(toRank.some(t => t.id === item.id)){
    document.getElementById('detail-overlay').classList.remove('active');
    switchToScreen('rank');
    renderAll();
    return;
  }
  const knownCat = item.category || findItemCategory(item.id);
  if(knownCat){
    queueItemForRanking(item, knownCat);
  } else {
    openRankCategoryPicker(item);
  }
}
function queueItemForRanking(item, cat){
  item.category = cat;
  toRank.push(item);
  document.getElementById('detail-overlay').classList.remove('active');
  switchToScreen('rank');
  renderAll();
  toast(`${item.name} added — let's rank it`);
}
function openRankCategoryPicker(item){
  let chosen = null;
  function render(){
    document.getElementById('newlist-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:4px;">Which category is this?</h3>
      <p class="caption" style="text-align:left; margin-bottom:10px;">${item.name}</p>
      <div class="category-pick-grid" id="rk-category-grid">
        ${Object.keys(LABELS).map(cat => `
          <button type="button" class="category-pick-btn ${chosen===cat ? 'selected' : ''}" data-rkcat="${cat}">
            ${ICONS[cat]}${LABELS[cat]}
          </button>`).join('')}
      </div>
      <button class="btn btn-brass btn-block" id="rk-continue-btn" style="margin-top:14px;">Continue</button>
      <button class="btn btn-outline btn-block" id="rk-cancel-btn" style="margin-top:8px;">Cancel</button>
    `;
    document.querySelectorAll('[data-rkcat]').forEach(b => b.addEventListener('click', () => { chosen = b.dataset.rkcat; render(); }));
    document.getElementById('rk-cancel-btn').addEventListener('click', () => document.getElementById('newlist-overlay').classList.remove('active'));
    document.getElementById('rk-continue-btn').addEventListener('click', () => {
      if(!chosen){ toast('Pick a category first', false); return; }
      document.getElementById('newlist-overlay').classList.remove('active');
      queueItemForRanking(item, chosen);
    });
  }
  render();
  document.getElementById('newlist-overlay').classList.add('active');
}

function toggleBookmark(item){
  if(isBookmarked(item.id)){
    removeBookmark(item);
    return;
  }
  openBookmarkCategoryPicker(item);
}
function openBookmarkCategoryPicker(item){
  let chosen = item.category || findItemCategory(item.id) || null;
  function render(){
    document.getElementById('newlist-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:4px;">Save to which category?</h3>
      <p class="caption" style="text-align:left; margin-bottom:10px;">${item.name}</p>
      <div class="category-pick-grid" id="bm-category-grid">
        ${Object.keys(LABELS).map(cat => `
          <button type="button" class="category-pick-btn ${chosen===cat ? 'selected' : ''}" data-bmcat="${cat}">
            ${ICONS[cat]}${LABELS[cat]}
          </button>`).join('')}
      </div>
      <button class="btn btn-brass btn-block" id="bm-save-btn" style="margin-top:14px;">Save</button>
      <button class="btn btn-outline btn-block" id="bm-cancel-btn" style="margin-top:8px;">Cancel</button>
    `;
    document.querySelectorAll('[data-bmcat]').forEach(b => b.addEventListener('click', () => { chosen = b.dataset.bmcat; render(); }));
    document.getElementById('bm-cancel-btn').addEventListener('click', () => document.getElementById('newlist-overlay').classList.remove('active'));
    document.getElementById('bm-save-btn').addEventListener('click', () => {
      if(!chosen){ toast('Pick a category first', false); return; }
      const list = wantToTry[chosen] || (wantToTry[chosen] = []);
      list.push({...item, category:chosen});
      feedPosts.unshift({
        id: 'fp' + Date.now(),
        friend: '@you',
        type: 'bookmark',
        itemId: item.id,
        itemName: item.name,
        category: chosen,
        loc: item.loc,
        time: 'just now',
        likes: 0, liked: false, comments: []
      });
      document.getElementById('newlist-overlay').classList.remove('active');
      openDetail(item);
      renderAll();
      toast(`Saved to ${LABELS[chosen]}`);
    });
  }
  render();
  document.getElementById('newlist-overlay').classList.add('active');
}

let recentlyViewed = [];
function trackRecentlyViewed(item){
  recentlyViewed = recentlyViewed.filter(i => i.id !== item.id);
  recentlyViewed.unshift(item);
  recentlyViewed = recentlyViewed.slice(0, 5);
}

function openDetail(item){
  trackRecentlyViewed(item);
  const cat = item.category || findItemCategory(item.id) || currentCategory;
  // normalize photos to {src, caption} objects, migrating older plain-string entries
  item.photos = (item.photos || (item.photo ? [item.photo] : [])).map(p =>
    typeof p === 'string' ? {src:p, caption:''} : p
  );
  const isRanked = item.score != null;
  const primaryPhoto = item.photos[0] ? item.photos[0].src : null;
  document.getElementById('detail-modal').innerHTML = `
    <div class="duel-media" style="${mediaStyle(cat, primaryPhoto)} height:150px; border-radius:12px; margin-bottom:14px;">${primaryPhoto ? '' : itemArt(item, cat)}</div>
    <h3 style="font-family:'Fraunces',serif; font-size:19px; color:var(--ink); margin-bottom:2px;">${item.name}</h3>
    <div class="xcard-loc" style="margin-bottom:10px;">${item.loc}${item.price ? ` · <span class="price-tier">${priceSymbols(item.price)}</span>` : ''}</div>
    ${isAdmin ? `<button class="btn btn-outline btn-sm" id="detail-admin-edit" style="margin-bottom:10px;">Edit details (admin)</button>` : ''}
    ${item.score != null ? `<div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">${scoreChipForItem(item)}<span class="caption" style="margin:0;">${TIERS_META[item.tier] ? TIERS_META[item.tier].label : ''}</span>
      <button class="btn btn-outline btn-sm" id="detail-rerank" style="margin-left:auto;">Re-rank</button></div>
      ${!categoryScoresUnlocked(cat) ? `<p class="caption" style="text-align:left; margin:-2px 0 6px;">Exact score unlocks once you've ranked ${SCORE_UNLOCK_THRESHOLD} things in ${LABELS[cat]} (${categoryRankCount(cat)}/${SCORE_UNLOCK_THRESHOLD}) — more comparisons make it more accurate.</p>` : ''}` : ''}
    ${miniScoreRow(item)}
    ${renderTags(item)}
    <p style="font-size:13px; color:var(--slate); line-height:1.5; margin:14px 0;">${item.blurb || item.why || ''}</p>
    ${isRanked ? `
    <div class="sec-label" style="margin-top:0;">Who were you with?</div>
    <div class="friend-grid" id="detail-friend-grid">
      ${FRIENDS.map(f => `<button class="friend-chip ${(item.friends||[]).includes(f.id)?'selected':''}" data-detail-friend="${f.id}"><span class="mini-avatar">${f.handle[1].toUpperCase()}</span>${f.handle}</button>`).join('')}
    </div>` : ''}
    ${friendsThinkSection(item)}

    ${item.visits ? `
    <div class="sec-label">Visits</div>
    <div class="stat-row">
      <div class="stat-label">${item.visits} visit${item.visits>1?'s':''}${item.lastVisited ? ` · last ${item.lastVisited}` : ''}</div>
    </div>
    <div style="display:flex; gap:8px; align-items:center; margin-top:-6px; margin-bottom:14px;">
      <input type="date" id="revisit-date" class="field-select" style="flex:1;" value="${new Date().toISOString().slice(0,10)}" max="${new Date().toISOString().slice(0,10)}">
      <button class="btn btn-outline btn-sm" id="detail-revisit">Log a revisit</button>
    </div>` : ''}

    ${!isRanked ? `
    <div style="display:flex; gap:8px; margin-bottom:14px;">
      <button class="btn btn-brass" style="flex:1;" id="detail-start-rank">I've done this — rank it</button>
      <button class="btn ${isBookmarked(item.id) ? 'btn-brass' : 'btn-outline'}" style="flex:1;" id="detail-bookmark">${isBookmarked(item.id) ? '✓ Saved' : '+ Save for later'}</button>
    </div>` : ''}
    ${isRanked ? `<button class="btn btn-outline btn-block" id="detail-addlist" style="margin-bottom:14px;">Add to a list</button>` : ''}

    ${isRanked ? `
    <div class="sec-label">Your notes</div>
    <textarea id="detail-note" class="field-select" style="height:56px; resize:none;" placeholder="What do you want to remember about this?">${item.note || ''}</textarea>` : ''}

    <div class="sec-label">Photos</div>
    ${item.coverPhoto ? `<p class="caption" style="text-align:left; margin-top:0;">Cover photo shared by whoever first added this activity — visible to other travelers until they add their own.</p>` : ''}
    <div id="detail-gallery">
      ${item.photos.map((p, idx) => `
        <div class="photo-note-row">
          <div class="gallery-thumb" style="width:52px; height:52px;"><img src="${p.src}"><button class="photo-remove" style="width:18px;height:18px;" data-photo-idx="${idx}">✕</button></div>
          <input type="text" class="field-select" data-caption-idx="${idx}" placeholder="Label this photo (e.g. waterfall)" value="${p.caption || ''}">
        </div>`).join('')}
    </div>
    <div class="gallery-add" id="detail-photo-trigger" style="width:100%; height:44px; margin-top:6px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" style="width:16px; height:16px; flex-shrink:0;"><path d="M12 5v14M5 12h14"/></svg>
      <span style="font-size:11px; margin-left:6px;">Add a photo</span>
    </div>
    <input type="file" accept="image/*" id="detail-photo-input" style="display:none;">

    <div class="sec-label">Book this experience</div>
    ${item.bookingUrl ? `
      <div class="booking-preview-card" style="margin-bottom:10px;">
        <div style="display:flex; align-items:center; gap:6px; font-size:11px; color:var(--trail); font-weight:600; margin-bottom:4px;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:13px;height:13px;"><path d="M5 13l4 4L19 7"/></svg>
          Matched on ${item.affiliateSource || 'a booking partner'}
        </div>
        <button class="btn btn-brass btn-block" disabled style="opacity:0.6; cursor:not-allowed;">Book Now (preview — not a live link)</button>
      </div>` : `
      <div class="empty" style="padding:22px 10px;">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>
        <p>Booking links will appear here once activity partners are connected.</p>
      </div>
      <button class="btn btn-outline btn-block" disabled style="opacity:0.5; cursor:not-allowed; margin-bottom:10px;">Booking coming soon</button>`}
    <button class="btn btn-brass btn-block" id="detail-close">Close</button>
    <button class="btn btn-outline btn-block" id="detail-report" style="margin-top:8px; border-color:transparent; color:var(--slate); font-size:11px;">Report an issue with this activity</button>
  `;
  document.getElementById('detail-overlay').classList.add('active');
  document.getElementById('detail-close').addEventListener('click', () => document.getElementById('detail-overlay').classList.remove('active'));
  document.getElementById('detail-report').addEventListener('click', () => openReportFlow(item.name));

  const noteEl = document.getElementById('detail-note');
  if(noteEl) noteEl.addEventListener('input', (e) => { item.note = e.target.value; });

  document.querySelectorAll('[data-detail-friend]').forEach(btn => btn.addEventListener('click', () => {
    const id = btn.dataset.detailFriend;
    item.friends = item.friends || [];
    if(item.friends.includes(id)) item.friends = item.friends.filter(x => x !== id);
    else item.friends.push(id);
    openDetail(item);
    renderAll();
  }));

  document.getElementById('detail-photo-trigger').addEventListener('click', () => document.getElementById('detail-photo-input').click());
  document.getElementById('detail-photo-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const isFirstEver = !item.coverPhoto;
      item.photos.push({src: ev.target.result, caption:''});
      item.photo = item.photos[0].src;
      if(isFirstEver){
        const ok = confirm(`You're the first to add a photo to ${item.name}. Okay to use it as the default cover photo other travelers see until they add their own?`);
        if(ok) item.coverPhoto = ev.target.result;
      }
      openDetail(item);
      renderAll();
    };
    reader.readAsDataURL(file);
  });
  document.querySelectorAll('[data-photo-idx]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const idx = Number(btn.dataset.photoIdx);
    const removedPhoto = item.photos[idx];
    item.photos.splice(idx, 1);
    item.photo = item.photos[0] ? item.photos[0].src : null;
    openDetail(item);
    renderAll();
    toast('Photo removed', true, () => {
      item.photos.splice(idx, 0, removedPhoto);
      item.photo = item.photos[0] ? item.photos[0].src : null;
      openDetail(item);
      renderAll();
      toast('Photo restored');
    });
  }));
  document.querySelectorAll('[data-caption-idx]').forEach(input => input.addEventListener('input', (e) => {
    item.photos[Number(input.dataset.captionIdx)].caption = e.target.value;
  }));
  const revisitBtn = document.getElementById('detail-revisit');
  if(revisitBtn) revisitBtn.addEventListener('click', () => {
    const dateEl = document.getElementById('revisit-date');
    const date = dateEl ? dateEl.value : new Date().toISOString().slice(0,10);
    item.visits = (item.visits || 0) + 1;
    item.visitDates = item.visitDates || [];
    item.visitDates.push(date);
    item.lastVisited = formatLoggedDate(date);
    openDetail(item);
    renderAll();
    toast(`Logged another visit to ${item.name}`);
  });
  const adminEditBtn = document.getElementById('detail-admin-edit');
  if(adminEditBtn) adminEditBtn.addEventListener('click', () => openAdminEditItem(item));
  const rerankBtn = document.getElementById('detail-rerank');
  if(rerankBtn) rerankBtn.addEventListener('click', () => {
    const itemCat = findItemCategory(item.id);
    if(!itemCat) return;
    ranked[itemCat] = ranked[itemCat].filter(i => i.id !== item.id);
    item.category = itemCat;
    item.tier = null;
    item.score = null;
    toRank.push(item);
    document.getElementById('detail-overlay').classList.remove('active');
    switchToScreen('rank');
    renderAll();
    toast(`${item.name} moved to Rank — redo your comparison`);
  });
  const addListBtn = document.getElementById('detail-addlist');
  if(addListBtn) addListBtn.addEventListener('click', () => openListChooser(item));
  const bookmarkBtn = document.getElementById('detail-bookmark');
  if(bookmarkBtn) bookmarkBtn.addEventListener('click', () => toggleBookmark(item));
  const startRankBtn = document.getElementById('detail-start-rank');
  if(startRankBtn) startRankBtn.addEventListener('click', () => startRankingFromDetail(item));
}
document.getElementById('detail-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'detail-overlay') document.getElementById('detail-overlay').classList.remove('active');
});

/* ---------------- DISCOVER SCREEN ---------------- */
function renderStamps(container, clickable){
  const el = document.getElementById(container);
  el.innerHTML = Object.keys(LABELS).map(cat => `
    <div class="stamp ${cat===currentCategory ? 'selected':''}" style="--c:${COLORS[cat]}" data-cat="${cat}">
      ${ICONS[cat]}
      <div class="stamp-label">${LABELS[cat]}</div>
    </div>`).join('');
  el.querySelectorAll('.stamp').forEach(s => s.addEventListener('click', () => {
    currentCategory = s.dataset.cat;
    renderAll();
  }));
}

function renderDiscover(){
  renderGlobalTrending();
  renderStamps('category-stamps', true);
  renderNearYou();
  const items = ranked[currentCategory] || [];
  const trending = document.getElementById('trending-list');
  trending.innerHTML = items.length ? items.map(i => xcardHTML({...i, category:currentCategory})).join('')
    : `<div class="empty">${ICONS[currentCategory]}<p>Nothing ranked in this category yet.<br>Suggest an activity to get started.</p></div>`;
  wireDetailClicks(trending, items);
}

function renderGlobalTrending(){
  const items = allCatalogItems().filter(i => i.trendCount).sort((a,b) => b.trendCount - a.trendCount).slice(0,5);
  const el = document.getElementById('global-trending-list');
  el.innerHTML = items.map(i => `
    <div class="nearby-row" data-open-id="${i.id}">
      <div style="width:32px;height:32px;border-radius:8px;flex-shrink:0;${mediaStyle(i.category, i.photo)}"></div>
      <div style="flex:1;">
        <div class="rank-name" style="font-size:13px;">${i.name}</div>
        <div class="rank-loc">${i.loc}</div>
      </div>
      <div class="nearby-dist"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:11px;height:11px;vertical-align:-1px;"><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/></svg> ${i.trendCount}</div>
    </div>`).join('');
  wireDetailClicks(el, items);
}

let nearYouSelectedId = 'a1';
let nearYouQuery = '';
function nearYouOptions(){
  const seen = new Set();
  const opts = [];
  allCatalogItems().forEach(i => {
    if(!seen.has(i.loc) && COORDS[i.id]){
      seen.add(i.loc);
      opts.push({id:i.id, label:i.loc});
    }
  });
  return opts;
}
function formatDistance(km){
  const mi = km * 0.621371;
  return `${mi < 1 ? '<1' : Math.round(mi)} mi`;
}
function renderNearYouSuggestions(){
  const box = document.getElementById('near-you-suggestions');
  if(!nearYouQuery.trim()){ box.innerHTML = ''; return; }
  const q = nearYouQuery.trim().toLowerCase();
  const matches = nearYouOptions().filter(o => o.label.toLowerCase().includes(q)).slice(0,6);
  if(!matches.length){ box.innerHTML = `<div class="nearyou-suggest-wrap"><p class="caption" style="padding:10px;">No matches yet — as more activities get added, more places will show up here.</p></div>`; return; }
  box.innerHTML = `<div class="nearyou-suggest-wrap">${matches.map(o => `
    <div class="nearyou-suggest-row" data-nearyou-pick="${o.id}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="width:14px;height:14px;color:var(--slate);"><path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
      <span style="font-size:13px; color:var(--ink);">${o.label}</span>
    </div>`).join('')}</div>`;
  box.querySelectorAll('[data-nearyou-pick]').forEach(row => row.addEventListener('click', () => {
    nearYouSelectedId = row.dataset.nearyouPick;
    locationPermission = null; // switching to a manual place overrides live location
    const opt = nearYouOptions().find(o => o.id === nearYouSelectedId);
    document.getElementById('near-you-input').value = opt ? opt.label : '';
    nearYouQuery = '';
    box.innerHTML = '';
    renderNearYou();
  }));
}
function renderNearYou(){
  const locBanner = document.getElementById('near-you-loc-status');
  const manualSearch = document.getElementById('near-you-manual-search');
  let origin, withDist;
  const items = allCatalogItems().filter(i => COORDS[i.id]);

  if(locationPermission === 'granted' && userCoords){
    manualSearch.style.display = 'none';
    locBanner.innerHTML = `
      <div class="admin-toggle-row" style="margin-bottom:8px;">
        <span>Using your current location.</span>
        <button class="role-pill" id="near-you-use-search">Search a place instead</button>
      </div>`;
    document.getElementById('near-you-use-search').addEventListener('click', () => { locationPermission = null; renderNearYou(); });
    origin = userCoords;
    withDist = items.map(i => ({...i, dist: haversineKm(origin, COORDS[i.id])})).sort((a,b) => a.dist - b.dist).slice(0,5);
  } else {
    manualSearch.style.display = 'block';
    locBanner.innerHTML = `
      <button class="btn btn-outline btn-block btn-sm" id="near-you-use-location" style="margin-bottom:8px;">
        Use my current location
      </button>`;
    document.getElementById('near-you-use-location').addEventListener('click', requestLocationPermission);

    const opts = nearYouOptions();
    const originOpt = opts.find(o => o.id === nearYouSelectedId);
    if(originOpt && !document.getElementById('near-you-input').value){
      document.getElementById('near-you-input').value = originOpt.label;
    }
    origin = COORDS[nearYouSelectedId];
    withDist = items.filter(i => i.id !== nearYouSelectedId).map(i => ({...i, dist: haversineKm(origin, COORDS[i.id])})).sort((a,b) => a.dist - b.dist).slice(0,5);
  }

  const list = document.getElementById('near-you-list');
  list.innerHTML = withDist.map(i => `
    <div class="nearby-row" data-open-id="${i.id}">
      <div style="width:32px;height:32px;border-radius:8px;flex-shrink:0;${mediaStyle(i.category, i.photo)}"></div>
      <div style="flex:1;">
        <div class="rank-name" style="font-size:13px;">${i.name}</div>
        <div class="rank-loc">${i.loc}</div>
      </div>
      <div class="nearby-dist">${formatDistance(i.dist)}</div>
    </div>`).join('');
  wireDetailClicks(list, withDist);
}

/* ---------------- MY LIST SCREEN ---------------- */
let listViewMode = 'category';
let listSortBy = 'score';
let listCityFilter = 'all';
let listCountryFilter = 'all';
const US_STATES = new Set(['Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut','Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa','Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan','Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire','New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio','Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota','Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia','Wisconsin','Wyoming']);
function getCountryFromLoc(loc){
  const parts = loc.split(',').map(s => s.trim());
  const last = parts[parts.length - 1];
  if(/^united states$|^usa$/i.test(last)) return 'United States';
  if(US_STATES.has(last)) return 'United States';
  return last;
}
function renderListModePills(){
  const pills = [
    {id:'category', label:'By category'},
    {id:'custom', label:'My lists'},
    {id:'guides', label:'Guides'}
  ];
  document.getElementById('list-mode-pills').innerHTML = pills.map(p =>
    `<button class="pill ${listViewMode===p.id?'active':''}" data-listmode="${p.id}">${p.label}</button>`
  ).join('');
  document.querySelectorAll('[data-listmode]').forEach(b => b.addEventListener('click', () => {
    listViewMode = b.dataset.listmode;
    renderList();
  }));
  document.getElementById('list-by-category').style.display = listViewMode === 'category' ? 'block' : 'none';
  document.getElementById('list-by-custom').style.display = listViewMode === 'custom' ? 'block' : 'none';
  document.getElementById('list-by-guides').style.display = listViewMode === 'guides' ? 'block' : 'none';
}
function renderList(){
  renderListModePills();
  if(listViewMode === 'custom'){
    renderCustomListsTab();
    return;
  }
  if(listViewMode === 'guides'){
    renderGuidesTab();
    return;
  }
  renderStamps('list-stamps');
  document.getElementById('list-title').textContent = LABELS[currentCategory] + ' — ranked';
  let items = [...(ranked[currentCategory] || [])];
  const progressEl = document.getElementById('list-unlock-progress');
  const count = categoryRankCount(currentCategory);
  progressEl.innerHTML = !categoryScoresUnlocked(currentCategory) && count > 0 ? `
    <p class="caption" style="text-align:left; margin:-2px 0 10px;">
      Scores unlock at ${SCORE_UNLOCK_THRESHOLD} ranked in ${LABELS[currentCategory]} — ${count}/${SCORE_UNLOCK_THRESHOLD} so far. More comparisons make the numbers more accurate.
    </p>` : '';

  const cities = [...new Set((ranked[currentCategory] || []).map(i => i.loc.split(',')[0].trim()))];
  const countries = [...new Set((ranked[currentCategory] || []).map(i => getCountryFromLoc(i.loc)))].sort();
  const filterEl = document.getElementById('list-filter-row');
  filterEl.innerHTML = `
    <button class="pill" id="list-sort-btn">Sort: ${listSortBy === 'score' ? 'Score' : 'Name'}</button>
    <select id="list-country-filter" class="field-select" style="width:auto; padding:6px 10px; font-size:11px;">
      <option value="all">All countries</option>
      ${countries.map(c => `<option value="${c}" ${listCountryFilter===c?'selected':''}>${c}</option>`).join('')}
    </select>
    <select id="list-city-filter" class="field-select" style="width:auto; padding:6px 10px; font-size:11px;">
      <option value="all">All cities</option>
      ${cities.map(c => `<option value="${c}" ${listCityFilter===c?'selected':''}>${c}</option>`).join('')}
    </select>`;
  document.getElementById('list-sort-btn').addEventListener('click', () => {
    listSortBy = listSortBy === 'score' ? 'name' : 'score';
    renderList();
  });
  document.getElementById('list-country-filter').addEventListener('change', (e) => {
    listCountryFilter = e.target.value;
    renderList();
  });
  document.getElementById('list-city-filter').addEventListener('change', (e) => {
    listCityFilter = e.target.value;
    renderList();
  });

  if(listCountryFilter !== 'all') items = items.filter(i => getCountryFromLoc(i.loc) === listCountryFilter);
  if(listCityFilter !== 'all') items = items.filter(i => i.loc.split(',')[0].trim() === listCityFilter);
  if(listSortBy === 'name') items.sort((a,b) => a.name.localeCompare(b.name));
  // score sort is already the natural order of ranked[] (kept sorted by score on insert)

  const canReorder = listSortBy === 'score' && listCityFilter === 'all' && listCountryFilter === 'all';
  const el = document.getElementById('list-content');
  el.innerHTML = items.length ? items.map((i) => rankRowHTML(i, (ranked[currentCategory]||[]).indexOf(i), canReorder)).join('') : `<div class="empty"><p>No ranked activities in ${LABELS[currentCategory]} yet.</p></div>`;
  wireDetailClicks(el, items);
  if(canReorder) wireRankRowReorder(el, currentCategory);
}
function renderCustomListsTab(){
  const all = allLists();
  const el = document.getElementById('custom-lists-content');
  el.innerHTML = all.length ? all.map(l => `
    <div class="rank-row" data-listtab-open="${l.id}">
      <div class="tag" style="background:${l.color}; color:#fff; border:none;">${listBeenCount(l)}</div>
      <div class="rank-info">
        <div class="rank-name">${l.title}</div>
        <div class="rank-loc">${l.subtitle} · been to ${listBeenCount(l)} of ${l.itemIds.length}</div>
      </div>
    </div>`).join('') : `<div class="empty"><p>No lists yet — create one to start grouping activities for a trip.</p></div>`;
  el.querySelectorAll('[data-listtab-open]').forEach(row => row.addEventListener('click', () => {
    const list = all.find(l => l.id === row.dataset.listtabOpen);
    if(list) openListDetail(list);
  }));
}

/* ---------------- QUEUE SCREEN ---------------- */
let isAdmin = true; // only the creator's account (and, eventually, automated matches against the verified catalog) can approve

function renderAdminToggle(){
  document.getElementById('admin-toggle-row').innerHTML = `
    <span>Only the Jaunt team (you) and verified database matches can approve places.</span>
    <div style="display:flex; gap:6px; flex-shrink:0;">
      <button class="role-pill ${isAdmin ? 'active' : ''}" id="role-admin">Admin</button>
      <button class="role-pill ${!isAdmin ? 'active' : ''}" id="role-member">Member view</button>
    </div>`;
  document.getElementById('role-admin').addEventListener('click', () => { isAdmin = true; renderAll(); });
  document.getElementById('role-member').addEventListener('click', () => { isAdmin = false; renderAll(); });

  const adminTools = document.getElementById('admin-tools-row');
  if(isAdmin){
    adminTools.innerHTML = `
      <button class="btn btn-brass btn-sm" style="flex:1;" id="bulk-import-btn">Bulk import</button>
      <button class="btn btn-outline btn-sm" style="flex:1;" id="approve-all-btn" ${pending.length ? '' : 'disabled'}>Approve all to catalog (${pending.length})</button>`;
    document.getElementById('bulk-import-btn').addEventListener('click', openBulkImport);
    document.getElementById('approve-all-btn').addEventListener('click', () => {
      if(!pending.length) return;
      const count = pending.length;
      [...pending].forEach(p => approveToCatalog(p.id));
      toast(`Added ${count} place${count>1?'s':''} to the catalog`);
    });
  } else {
    adminTools.innerHTML = '';
  }
}

function renderQueue(){
  renderAdminToggle();
  const el = document.getElementById('queue-content');
  document.getElementById('queue-badge').style.display = pending.length ? 'flex' : 'none';
  document.getElementById('queue-badge').textContent = pending.length;
  el.innerHTML = pending.length ? pending.map(p => `
    <div class="qcard">
      ${p.photo ? `<img src="${p.photo}" style="width:100%; height:110px; object-fit:cover; border-radius:8px; margin-bottom:10px;">` : ''}
      <div class="qcard-top">
        <div>
          <div class="qcard-name">${p.name}</div>
          <div class="qcard-loc">${p.loc}</div>
        </div>
        <span class="cat-pill" style="background:${COLORS[p.category]}">${LABELS[p.category]}</span>
      </div>
      <div class="qcard-meta">${p.blurb}<br><b>Submitted by</b> ${p.submitter}${p.licensed ? '<br><span style="color:var(--trail); font-weight:600;">Photo will become this activity\'s shared cover photo</span>' : ''}</div>
      ${isAdmin
        ? `<div class="qcard-actions" style="flex-wrap:wrap;">
            <button class="btn btn-approve btn-sm" style="flex:1 1 100%;" data-approve-catalog="${p.id}">Approve to catalog</button>
            <button class="btn btn-outline btn-sm" style="flex:1;" data-approve="${p.id}" title="Use this if you personally did this activity">I did this — rank it</button>
            <button class="btn btn-outline btn-sm" style="flex:1;" data-edit="${p.id}">Edit</button>
            <button class="btn btn-reject btn-sm" style="flex:1;" data-reject="${p.id}">Reject</button>
          </div>`
        : `<div class="perk-status locked" style="margin-top:6px;">Pending review by the Jaunt team</div>`}
    </div>`).join('') : `<div class="empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><p>Queue is clear. New suggestions will land here for review.</p></div>`;

  if(isAdmin){
    el.querySelectorAll('[data-approve-catalog]').forEach(b => b.addEventListener('click', () => approveToCatalog(b.dataset.approveCatalog)));
    el.querySelectorAll('[data-approve]').forEach(b => b.addEventListener('click', () => approveItem(b.dataset.approve)));
    el.querySelectorAll('[data-edit]').forEach(b => b.addEventListener('click', () => openEditPendingForm(b.dataset.edit)));
    el.querySelectorAll('[data-reject]').forEach(b => b.addEventListener('click', () => rejectItem(b.dataset.reject)));
  }

  const reportsSection = document.getElementById('reports-section');
  if(isAdmin){
    reportsSection.innerHTML = `
      <div class="sec-label">Reported content <span class="nav-badge" style="position:static; display:${reports.length?'inline-flex':'none'};">${reports.length}</span></div>
      ${reports.length ? reports.map(r => `
        <div class="qcard">
          <div class="qcard-name">${r.label}</div>
          <div class="qcard-meta"><b>Reason</b>: ${r.reason} · ${r.time}</div>
          <button class="btn btn-outline btn-sm btn-block" style="margin-top:8px;" data-dismiss-report="${r.id}">Dismiss</button>
        </div>`).join('') : `<p class="caption" style="text-align:left;">No open reports.</p>`}
    `;
    reportsSection.querySelectorAll('[data-dismiss-report]').forEach(b => b.addEventListener('click', () => {
      const report = reports.find(r => r.id === b.dataset.dismissReport);
      reports = reports.filter(r => r.id !== b.dataset.dismissReport);
      if(report){
        notifications.unshift({
          id: 'nt' + Date.now(), icon:'queue', type:'rank',
          text: `Your report on <b>${report.label}</b> was reviewed by the Jaunt team`,
          time:'just now', read:false
        });
        renderNotifBadge();
      }
      renderQueue();
      toast('Report dismissed — reporter notified');
    }));
  } else {
    reportsSection.innerHTML = '';
  }
}

function approveItem(id){
  if(!isAdmin){ toast('Only admins can approve places', false); return; }
  const idx = pending.findIndex(p => p.id === id);
  if(idx === -1) return;
  const item = pending.splice(idx,1)[0];
  if(item.photo && item.licensed){
    item.coverPhoto = item.photo;
  }
  if(item.submitter === '@you') firstFinderCount++;
  toRank.push(item);
  renderAll();
  toast('Approved — added to ' + LABELS[item.category] + ' to rank');
}
async function approveToCatalog(id){
  if(!isAdmin){ toast('Only admins can approve places', false); return; }
  const idx = pending.findIndex(p => p.id === id);
  if(idx === -1) return;
  const item = pending.splice(idx,1)[0];
  if(item.photo && item.licensed){
    item.coverPhoto = item.photo;
  }
  if(item.submitter === '@you') firstFinderCount++;
  recs[item.category] || (recs[item.category] = []);
  recs[item.category].push({
    id: item.id, name: item.name, loc: item.loc, blurb: item.blurb,
    why: 'Newly added to Jaunt', source: 'Curated',
    recommendedScore: 7.5, avgScore: null,
    trendCount: 0, price: item.price || 2, tags: item.tags || [],
    recSampleSize: null, avgSampleCount: null,
    photo: item.photo || null, coverPhoto: item.coverPhoto || null,
    bookingUrl: item.bookingUrl || null, affiliateSource: item.affiliateSource || null
  });
  renderAll();

  // Write through to Supabase so this is visible to everyone, not just this browser.
  // This currently works because RLS is disabled on your table — meaning literally
  // anyone with your site's URL could also insert rows directly, not just through
  // this button. Worth fixing with a real policy (and eventually real auth) once
  // you're past small-scale testing with a friend.
  if(db){
    try {
      const { error } = await db.from('Activities').insert([{
        Name: item.name, Location: item.loc, Category: item.category, Description: item.blurb
      }]);
      if(error){
        console.error('[Supabase] Insert failed:', error);
        toast('Added locally, but syncing to the shared database failed — check console', false);
      } else {
        console.log('[Supabase] Synced to shared database:', item.name);
        toast('Added to catalog and synced to the shared database');
      }
    } catch(e){
      console.error('[Supabase] Insert crashed:', e);
      toast('Added locally, but syncing to the shared database failed — check console', false);
    }
  } else {
    console.warn('[Supabase] No connection — "' + item.name + '" is only saved in this browser');
    toast('Added locally only — no live database connection, your friend won\'t see this yet', false);
  }
}
function findCatalogRefs(id){
  const refs = [];
  Object.keys(recs).forEach(cat => {
    const found = recs[cat].find(i => i.id === id);
    if(found) refs.push({obj:found, bucket:'recs', cat});
  });
  Object.keys(ranked).forEach(cat => {
    const found = ranked[cat].find(i => i.id === id);
    if(found) refs.push({obj:found, bucket:'ranked', cat});
  });
  Object.keys(wantToTry).forEach(cat => {
    const found = wantToTry[cat].find(i => i.id === id);
    if(found) refs.push({obj:found, bucket:'wantToTry', cat});
  });
  return refs;
}
function openAdminEditItem(item){
  const refs = findCatalogRefs(item.id);
  if(!refs.length){
    toast("This entry only exists as someone's personal record and can't be edited here", false);
    return;
  }
  const draft = { name: item.name, loc: item.loc, blurb: item.blurb || '', tags: (item.tags || []).join(', '), category: item.category || refs[0].cat };
  function render(){
    document.getElementById('newlist-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:10px;">Edit details (admin)</h3>
      <div class="field"><label>Name</label><input type="text" id="ae-name" value="${draft.name.replace(/"/g,'&quot;')}"></div>
      <div class="field"><label>Location</label><input type="text" id="ae-loc" value="${draft.loc.replace(/"/g,'&quot;')}"></div>
      <div class="field">
        <label>Category</label>
        <div class="category-pick-grid" id="ae-category-grid">
          ${Object.keys(LABELS).map(cat => `
            <button type="button" class="category-pick-btn ${draft.category===cat ? 'selected' : ''}" data-aecat="${cat}">
              ${ICONS[cat]}${LABELS[cat]}
            </button>`).join('')}
        </div>
      </div>
      <div class="field"><label>Description</label><textarea id="ae-desc" class="field-select" style="height:70px; resize:none;">${draft.blurb.replace(/</g,'&lt;')}</textarea></div>
      <div class="field"><label>Tags (comma separated)</label><input type="text" id="ae-tags" value="${draft.tags.replace(/"/g,'&quot;')}"></div>
      <p class="caption" style="text-align:left; margin-top:4px;">Updates the shared catalog entry everywhere it appears. Personal notes and photos other people have already added to their own copies won't be affected.</p>
      <button class="btn btn-brass btn-block" id="ae-save" style="margin-top:12px;">Save changes</button>
      <button class="btn btn-outline btn-block" id="ae-cancel" style="margin-top:8px;">Cancel</button>
    `;
    const nameEl = document.getElementById('ae-name');
    const locEl = document.getElementById('ae-loc');
    const descEl = document.getElementById('ae-desc');
    const tagsEl = document.getElementById('ae-tags');
    nameEl.addEventListener('input', (e) => { draft.name = e.target.value; });
    locEl.addEventListener('input', (e) => { draft.loc = e.target.value; });
    descEl.addEventListener('input', (e) => { draft.blurb = e.target.value; });
    tagsEl.addEventListener('input', (e) => { draft.tags = e.target.value; });
    document.querySelectorAll('[data-aecat]').forEach(b => b.addEventListener('click', () => { draft.category = b.dataset.aecat; render(); }));
    document.getElementById('ae-cancel').addEventListener('click', () => document.getElementById('newlist-overlay').classList.remove('active'));
    document.getElementById('ae-save').addEventListener('click', () => {
      const name = draft.name.trim();
      const loc = draft.loc.trim();
      if(!name || !loc){ toast('Name and location are required', false); return; }
      const blurb = draft.blurb.trim();
      const tags = draft.tags.split(',').map(t => t.trim()).filter(Boolean);
      const chosenCat = draft.category;

      refs.forEach(ref => {
        ref.obj.name = name;
        ref.obj.loc = loc;
        ref.obj.blurb = blurb;
        ref.obj.tags = tags;
        if(chosenCat !== ref.cat){
          const store = ref.bucket === 'recs' ? recs : ref.bucket === 'ranked' ? ranked : wantToTry;
          store[ref.cat] = store[ref.cat].filter(i => i.id !== ref.obj.id);
          ref.obj.category = chosenCat;
          store[chosenCat] || (store[chosenCat] = []);
          store[chosenCat].push(ref.obj);
        } else {
          ref.obj.category = chosenCat;
        }
      });

      item.name = name; item.loc = loc; item.blurb = blurb; item.tags = tags; item.category = chosenCat;
      document.getElementById('newlist-overlay').classList.remove('active');
      openDetail(item);
      renderAll();
      toast('Catalog entry updated');
    });
  }
  render();
  document.getElementById('newlist-overlay').classList.add('active');
}
function openEditPendingForm(id){
  const item = pending.find(p => p.id === id);
  if(!item) return;
  let chosenCat = item.category;
  function render(){
    document.getElementById('newlist-modal').innerHTML = `
      <h3 style="font-family:'Fraunces',serif; font-size:16px; color:var(--ink); margin-bottom:10px;">Edit submission</h3>
      <div class="field"><label>Name</label><input type="text" id="edit-p-name" value="${item.name.replace(/"/g,'&quot;')}"></div>
      <div class="field"><label>Location</label><input type="text" id="edit-p-loc" value="${item.loc.replace(/"/g,'&quot;')}"></div>
      <div class="field">
        <label>Category</label>
        <div class="category-pick-grid" id="edit-p-category-grid">
          ${Object.keys(LABELS).map(cat => `
            <button type="button" class="category-pick-btn ${chosenCat===cat ? 'selected' : ''}" data-editcat="${cat}">
              ${ICONS[cat]}${LABELS[cat]}
            </button>`).join('')}
        </div>
      </div>
      <div class="field"><label>Why it belongs</label><textarea id="edit-p-desc" class="field-select" style="height:64px; resize:none;">${item.blurb}</textarea></div>
      <button class="btn btn-brass btn-block" id="edit-p-save" style="margin-top:10px;">Save changes</button>
      <button class="btn btn-outline btn-block" id="edit-p-cancel" style="margin-top:8px;">Cancel</button>
    `;
    document.querySelectorAll('[data-editcat]').forEach(b => b.addEventListener('click', () => { chosenCat = b.dataset.editcat; render(); }));
    document.getElementById('edit-p-cancel').addEventListener('click', () => document.getElementById('newlist-overlay').classList.remove('active'));
    document.getElementById('edit-p-save').addEventListener('click', () => {
      const name = document.getElementById('edit-p-name').value.trim();
      const loc = document.getElementById('edit-p-loc').value.trim();
      if(!name || !loc){ toast('Name and location are required', false); return; }
      item.name = name;
      item.loc = loc;
      item.category = chosenCat;
      item.blurb = document.getElementById('edit-p-desc').value.trim() || item.blurb;
      document.getElementById('newlist-overlay').classList.remove('active');
      renderAll();
      toast('Submission updated');
    });
  }
  render();
  document.getElementById('newlist-overlay').classList.add('active');
}
function rejectItem(id){
  if(!isAdmin){ toast('Only admins can reject places', false); return; }
  const idx = pending.findIndex(p => p.id === id);
  if(idx === -1) return;
  const removed = pending.splice(idx, 1)[0];
  renderAll();
  toast(`"${removed.name}" removed`, false, () => {
    pending.splice(idx, 0, removed);
    renderAll();
    toast('Restored to Queue');
  });
}

/* ---- Bulk import (admin only) ---- */
function parseCSVLine(line){
  const result = [];
  let cur = '';
  let inQuotes = false;
  for(let i=0; i<line.length; i++){
    const c = line[i];
    if(inQuotes){
      if(c === '"'){
        if(line[i+1] === '"'){ cur += '"'; i++; }
        else { inQuotes = false; }
      } else cur += c;
    } else {
      if(c === '"') inQuotes = true;
      else if(c === ','){ result.push(cur); cur = ''; }
      else cur += c;
    }
  }
  result.push(cur);
  return result.map(s => s.trim());
}
function parseBulkCSV(text){
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
  const validCats = Object.keys(LABELS);
  let startIdx = 0;
  if(lines.length && parseCSVLine(lines[0])[0].toLowerCase() === 'name') startIdx = 1;
  const rows = [];
  const errors = [];
  for(let i = startIdx; i < lines.length; i++){
    const [name, loc, categoryRaw, blurb] = parseCSVLine(lines[i]);
    const category = (categoryRaw || '').toLowerCase();
    if(!name || !loc){ errors.push(`Line ${i+1}: missing name or location`); continue; }
    if(!validCats.includes(category)){ errors.push(`Line ${i+1}: category must be one of ${validCats.join(', ')}`); continue; }
    rows.push({name, loc, category, blurb: blurb || 'No description provided.'});
  }
  return {rows, errors};
}
function openBulkImport(){
  document.getElementById('bulkimport-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:4px;">Bulk import places</h3>
    <p class="caption" style="text-align:left; margin-bottom:8px;">One place per line: name, location, category, description. Quote any field with a comma in it. Category must be exploration, nature, adrenaline, leisure, or culture. Imports land in the Queue for review like any other submission.</p>
    <textarea id="bulk-csv-input" class="field-select" style="height:150px; font-family:'IBM Plex Mono', monospace; font-size:10.5px; resize:vertical;" placeholder='Grand Canyon Rim Trail,"Grand Canyon, Arizona, United States",nature,Iconic canyon views along an easy rim walk.'></textarea>
    <div id="bulk-import-results" style="margin-top:8px;"></div>
    <button class="btn btn-brass btn-block" id="bulk-import-run" style="margin-top:12px;">Import</button>
    <button class="btn btn-outline btn-block" id="bulk-import-close" style="margin-top:8px;">Close</button>
  `;
  document.getElementById('bulkimport-overlay').classList.add('active');
  document.getElementById('bulk-import-close').addEventListener('click', () => document.getElementById('bulkimport-overlay').classList.remove('active'));
  document.getElementById('bulk-import-run').addEventListener('click', () => {
    const text = document.getElementById('bulk-csv-input').value;
    const {rows, errors} = parseBulkCSV(text);
    const results = document.getElementById('bulk-import-results');
    if(!rows.length && !errors.length){
      results.innerHTML = `<p class="caption" style="text-align:left; color:var(--signal);">Paste some rows first.</p>`;
      return;
    }
    rows.forEach(r => {
      pending.push({
        id: 'p' + Date.now() + Math.random().toString(36).slice(2,6),
        name: r.name, loc: r.loc, category: r.category, blurb: r.blurb,
        submitter: '@you (bulk import)', photo: null, licensed: false
      });
    });
    results.innerHTML = `
      <p class="caption" style="text-align:left; color:var(--trail);">${rows.length} place${rows.length===1?'':'s'} added to the Queue.</p>
      ${errors.length ? `<p class="caption" style="text-align:left; color:var(--signal); margin-top:4px;">${errors.length} row${errors.length===1?'':'s'} skipped:<br>${errors.join('<br>')}</p>` : ''}
    `;
    if(rows.length){
      renderAll();
      toast(`Imported ${rows.length} place${rows.length===1?'':'s'} for review`);
    }
  });
}
document.getElementById('bulkimport-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'bulkimport-overlay') document.getElementById('bulkimport-overlay').classList.remove('active');
});

/* ---------------- RANK / DUEL SCREEN ---------------- */
function startDuel(item){
  const initialCat = item.category || 'exploration';
  ranked[initialCat] || (ranked[initialCat] = []);
  const today = new Date().toISOString().slice(0,10);
  duelState = { item, category:initialCat, tier:null, lo:null, hi:null, tierList:null, comparisons:0, logged:false, taggedFriends:[], photos:[], photoLicensed:false, note:'', loggedDate:today };
  renderRank();
}

function currentOpponentIndex(){
  return Math.floor((duelState.lo + duelState.hi) / 2);
}

function mediaStyle(category, photo){
  return photo ? `--c:${COLORS[category]}; background-image:url(${photo}); background-size:cover; background-position:center;` : `--c:${COLORS[category]};`;
}

function renderLogStep(){
  const item = duelState.item;
  const selected = duelState.taggedFriends;
  const photos = duelState.photos;
  const coverPhoto = photos[0] ? photos[0].src : null;
  const isFirstPhotoForActivity = !item.coverPhoto;
  return `
    <div class="caption" style="margin-bottom:14px;">Log this before ranking it</div>
    <div class="duel-card" style="margin-bottom:16px;">
      <div class="duel-media" style="${mediaStyle(duelState.category, coverPhoto)}">${coverPhoto ? '' : itemArt(item, duelState.category)}</div>
      <div class="duel-body">
        <div class="duel-name">${item.name}</div>
        <div class="duel-loc">${item.loc}</div>
      </div>
    </div>

    <div class="sec-label" style="margin-top:0;">When did you do this?</div>
    <input type="date" id="log-date" class="field-select" value="${duelState.loggedDate}" max="${new Date().toISOString().slice(0,10)}">

    <div class="sec-label">Which category is this?</div>
    <div class="category-pick-grid" id="log-category-grid">
      ${Object.keys(LABELS).map(cat => `
        <button type="button" class="category-pick-btn ${duelState.category===cat ? 'selected' : ''}" data-logcat="${cat}">
          ${ICONS[cat]}${LABELS[cat]}
        </button>`).join('')}
    </div>
    <p class="caption" style="text-align:left; margin:2px 0 4px;">It's your call — something like skydiving could just as easily go under Nature as Adrenaline.</p>

    <div class="sec-label">How was it?</div>
    <div class="tier-pills" id="tier-pills">
      ${Object.keys(TIERS_META).map(t => `<button class="tier-pill ${duelState.tier===t?'selected':''}" style="--c:${TIERS_META[t].color}" data-tier="${t}">${TIERS_META[t].label}</button>`).join('')}
    </div>

    <div class="sec-label" style="margin-top:0;">Who were you with?</div>
    <div class="friend-grid" id="friend-grid">
      ${FRIENDS.map(f => `<button class="friend-chip ${selected.includes(f.id)?'selected':''}" data-friend="${f.id}"><span class="mini-avatar">${f.handle[1].toUpperCase()}</span>${f.handle}</button>`).join('')}
    </div>
    <p class="caption" style="text-align:left; margin:2px 0 4px;">Tagged friends get this added to their own queue to rank.</p>

    <div class="sec-label">Your notes</div>
    <textarea id="log-note" class="field-select" style="height:56px; resize:none;" placeholder="What do you want to remember about this?">${duelState.note}</textarea>

    <div class="sec-label">Photos</div>
    <p class="caption" style="text-align:left; margin:-4px 0 8px;">Add as many as you want — before, mid-jump, after, the view, whatever tells the story.</p>
    ${photos.map((p, idx) => `
      <div class="photo-note-row">
        <div class="gallery-thumb" style="width:52px; height:52px;"><img src="${p.src}"><button class="photo-remove" style="width:18px;height:18px;" data-log-photo-remove="${idx}">✕</button></div>
        <input type="text" class="field-select" data-log-caption-idx="${idx}" placeholder="Label this photo (e.g. mid-jump)" value="${p.caption || ''}">
      </div>`).join('')}
    ${photos.length && isFirstPhotoForActivity ? `
      <label style="display:flex; align-items:flex-start; gap:8px; margin:6px 0 10px; font-size:11.5px; color:var(--slate); line-height:1.4; cursor:pointer;">
        <input type="checkbox" id="log-photo-license" style="margin-top:2px;" ${duelState.photoLicensed ? 'checked' : ''}>
        <span>You're the first to add photos here — okay to use your first one as the default cover photo other travelers see until they add their own?</span>
      </label>` : ''}
    <div class="gallery-add" id="photo-trigger" style="width:100%; height:44px; margin-top:6px;">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 5v14M5 12h14"/></svg>
      <span style="font-size:11px; margin-left:6px;">${photos.length ? 'Add another photo' : 'Add a photo'}</span>
    </div>
    <input type="file" accept="image/*" id="photo-input" style="display:none;">

    <button class="btn btn-brass btn-block" id="start-ranking" style="margin-top:16px;">${duelState.tier ? 'Start ranking' : 'Pick how it was to continue'}</button>
  `;
}

function wireLogStep(){
  const dateEl = document.getElementById('log-date');
  if(dateEl) dateEl.addEventListener('input', (e) => { duelState.loggedDate = e.target.value; });
  document.querySelectorAll('#log-category-grid [data-logcat]').forEach(b => b.addEventListener('click', () => {
    duelState.category = b.dataset.logcat;
    renderRank();
  }));
  document.querySelectorAll('#tier-pills .tier-pill').forEach(b => b.addEventListener('click', () => {
    duelState.tier = b.dataset.tier;
    renderRank();
  }));
  document.querySelectorAll('#friend-grid .friend-chip').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.friend;
    if(duelState.taggedFriends.includes(id)) duelState.taggedFriends = duelState.taggedFriends.filter(x => x !== id);
    else duelState.taggedFriends.push(id);
    renderRank();
  }));
  const noteEl = document.getElementById('log-note');
  if(noteEl) noteEl.addEventListener('input', (e) => { duelState.note = e.target.value; });
  document.querySelectorAll('[data-log-caption-idx]').forEach(input => input.addEventListener('input', (e) => {
    duelState.photos[Number(input.dataset.logCaptionIdx)].caption = e.target.value;
  }));
  document.querySelectorAll('[data-log-photo-remove]').forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    duelState.photos.splice(Number(btn.dataset.logPhotoRemove), 1);
    renderRank();
  }));
  const licenseEl = document.getElementById('log-photo-license');
  if(licenseEl) licenseEl.addEventListener('change', (e) => { duelState.photoLicensed = e.target.checked; });
  const trigger = document.getElementById('photo-trigger');
  if(trigger) trigger.addEventListener('click', () => document.getElementById('photo-input').click());
  document.getElementById('photo-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { duelState.photos.push({src: ev.target.result, caption:''}); renderRank(); };
    reader.readAsDataURL(file);
  });
  document.getElementById('start-ranking').addEventListener('click', () => {
    if(!duelState.tier){ toast('Pick how it was first', false); return; }
    ranked[duelState.category] || (ranked[duelState.category] = []);
    duelState.tierList = ranked[duelState.category].filter(i => i.tier === duelState.tier);
    duelState.lo = 0;
    duelState.hi = duelState.tierList.length;
    duelState.logged = true;
    if(duelState.taggedFriends.length){
      toast(`Tagged ${duelState.taggedFriends.length} friend${duelState.taggedFriends.length>1?'s':''} — they'll get this to rank too`);
    }
    renderRank();
  });
}

function renderRank(){
  const badge = document.getElementById('rank-badge');
  badge.style.display = toRank.length ? 'flex' : 'none';
  badge.textContent = toRank.length;

  const el = document.getElementById('rank-content');

  if(!duelState && toRank.length){
    startDuel(toRank[0]);
    return;
  }

  if(!duelState){
    el.innerHTML = `<div class="empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M8 3v13M8 16l-3-3M8 16l3-3M16 21V8M16 8l-3 3M16 8l3 3"/></svg>
      <p>Nothing to rank right now.<br>Approve a suggestion in the Queue, or check back after your next trip.</p>
    </div>`;
    return;
  }

  if(!duelState.logged){
    el.innerHTML = renderLogStep();
    wireLogStep();
    return;
  }

  if(duelState.lo >= duelState.hi){
    // finished this tier's comparisons — compute score, attach details, insert by score
    const score = computeScore(duelState.tier, duelState.lo, duelState.tierList.length);
    duelState.item.category = duelState.category;
    duelState.item.tier = duelState.tier;
    duelState.item.score = score;
    duelState.item.friends = duelState.taggedFriends;
    duelState.item.note = duelState.note;
    duelState.item.photos = duelState.photos;
    duelState.item.photo = duelState.photos[0] ? duelState.photos[0].src : null;
    if(duelState.photos.length && duelState.photoLicensed && !duelState.item.coverPhoto){
      duelState.item.coverPhoto = duelState.photos[0].src;
    }
    duelState.item.visits = 1;
    duelState.item.loggedDate = duelState.loggedDate;
    duelState.item.visitDates = [duelState.loggedDate];
    duelState.item.lastVisited = formatLoggedDate(duelState.loggedDate);
    const globalIdx = insertByScore(duelState.category, duelState.item);
    toRank = toRank.filter(t => t.id !== duelState.item.id);

    // publish to the feed, mirroring how a friend's post looks
    feedPosts.unshift({
      id: 'fp' + Date.now(),
      friend: '@you',
      itemId: duelState.item.id,
      itemName: duelState.item.name,
      category: duelState.category,
      loc: duelState.item.loc,
      withYou: false,
      withFriends: duelState.taggedFriends,
      score, tier: duelState.tier,
      note: duelState.note || '',
      photo: duelState.photos[0] || null,
      time: 'just now',
      likes: 0, liked: false, comments: []
    });

    const scoresUnlocked = categoryScoresUnlocked(duelState.category);
    el.innerHTML = `<div class="empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <p style="color:var(--ink); font-weight:600; font-size:14px;">${duelState.item.name} ${scoresUnlocked ? `scored ${score.toFixed(1)}/10` : 'was added'}</p>
      <p>#${globalIdx + 1} in your ${LABELS[duelState.category]} list. Shared to your feed.</p>
      ${!scoresUnlocked ? `<p class="caption" style="margin-top:6px;">Exact score unlocks at ${SCORE_UNLOCK_THRESHOLD} ranked in ${LABELS[duelState.category]} (${categoryRankCount(duelState.category)}/${SCORE_UNLOCK_THRESHOLD})</p>` : ''}
    </div>
    <button class="btn btn-brass btn-block" id="continue-rank">Continue</button>`;
    document.getElementById('continue-rank').addEventListener('click', () => {
      duelState = null;
      renderAll();
    });
    return;
  }

  const oppIdx = currentOpponentIndex();
  const opponent = duelState.tierList[oppIdx];
  const item = duelState.item;

  el.innerHTML = `
    <div class="caption" style="margin-bottom:14px;">Comparing against your "${TIERS_META[duelState.tier].label}" ${LABELS[duelState.category]} · round ${duelState.comparisons + 1}</div>
    <div class="vs-wrap">
      <div class="duel-card">
        <div class="duel-media" style="${mediaStyle(duelState.category, duelState.photos[0] ? duelState.photos[0].src : null)}">${duelState.photos[0] ? '' : itemArt(item, duelState.category)}</div>
        <div class="duel-body">
          <div class="duel-name">${item.name}</div>
          <div class="duel-loc">${item.loc}</div>
          <div class="duel-blurb">${item.blurb}</div>
          <button class="btn btn-primary btn-block" data-pick="item">This was better</button>
        </div>
      </div>
      <div class="vs-badge">VS</div>
      <div class="duel-card">
        <div class="duel-media" style="${mediaStyle(duelState.category, opponent.photo)}">${opponent.photo ? '' : itemArt(opponent, duelState.category)}</div>
        <div class="duel-body">
          <div class="duel-top" style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
            <div class="duel-name">${opponent.name}</div>
            ${scoreChipForItem(opponent, true)}
          </div>
          <div class="duel-loc">${opponent.loc}</div>
          <div class="duel-blurb">${opponent.blurb}</div>
          <button class="btn btn-primary btn-block" data-pick="opponent">This was better</button>
        </div>
      </div>
      <div class="duel-actions">
        <button class="btn btn-outline" style="flex:1;" id="duel-tie">Too tough to call</button>
        <button class="btn btn-outline" style="flex:1;" id="duel-skip">Skip for now</button>
      </div>
    </div>`;

  el.querySelector('[data-pick="item"]').addEventListener('click', () => {
    duelState.hi = oppIdx;
    duelState.comparisons++;
    renderRank();
  });
  el.querySelector('[data-pick="opponent"]').addEventListener('click', () => {
    duelState.lo = oppIdx + 1;
    duelState.comparisons++;
    renderRank();
  });
  document.getElementById('duel-tie').addEventListener('click', () => {
    // a tie means both items get the same score — end the duel here, don't keep comparing
    const score = opponent.score;
    duelState.item.category = duelState.category;
    duelState.item.tier = opponent.tier;
    duelState.item.score = score;
    duelState.item.friends = duelState.taggedFriends;
    duelState.item.note = duelState.note;
    duelState.item.photos = duelState.photos;
    duelState.item.photo = duelState.photos[0] ? duelState.photos[0].src : null;
    if(duelState.photos.length && duelState.photoLicensed && !duelState.item.coverPhoto){
      duelState.item.coverPhoto = duelState.photos[0].src;
    }
    duelState.item.visits = 1;
    duelState.item.loggedDate = duelState.loggedDate;
    duelState.item.visitDates = [duelState.loggedDate];
    duelState.item.lastVisited = formatLoggedDate(duelState.loggedDate);

    const list = ranked[duelState.category];
    const oppGlobalIdx = list.findIndex(i => i.id === opponent.id);
    const insertIdx = oppGlobalIdx === -1 ? list.length : oppGlobalIdx + 1;
    list.splice(insertIdx, 0, duelState.item);
    toRank = toRank.filter(t => t.id !== duelState.item.id);

    feedPosts.unshift({
      id: 'fp' + Date.now(),
      friend: '@you',
      itemId: duelState.item.id,
      itemName: duelState.item.name,
      category: duelState.category,
      loc: duelState.item.loc,
      withYou: false,
      withFriends: duelState.taggedFriends,
      score, tier: duelState.item.tier,
      note: duelState.note || '',
      photo: duelState.photos[0] || null,
      time: 'just now',
      likes: 0, liked: false, comments: []
    });

    const tieScoresUnlocked = categoryScoresUnlocked(duelState.category);
    document.getElementById('rank-content').innerHTML = `<div class="empty">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 12l2 2 4-4M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
      <p style="color:var(--ink); font-weight:600; font-size:14px;">${duelState.item.name} tied with ${opponent.name}${tieScoresUnlocked ? ` at ${score.toFixed(1)}/10` : ''}</p>
      <p>#${insertIdx + 1} in your ${LABELS[duelState.category]} list. Shared to your feed.</p>
      ${!tieScoresUnlocked ? `<p class="caption" style="margin-top:6px;">Exact score unlocks at ${SCORE_UNLOCK_THRESHOLD} ranked in ${LABELS[duelState.category]} (${categoryRankCount(duelState.category)}/${SCORE_UNLOCK_THRESHOLD})</p>` : ''}
    </div>
    <button class="btn btn-brass btn-block" id="continue-rank">Continue</button>`;
    document.getElementById('continue-rank').addEventListener('click', () => {
      duelState = null;
      renderAll();
    });
  });
  document.getElementById('duel-skip').addEventListener('click', () => {
    duelState = null;
    renderRank();
  });
}

/* ---------------- PROFILE TAB ---------------- */
function renderWorldMap(pinData){
  const resolved = pinData || computeBeenPins().map(p => {
    const item = findRankedItem(p.id);
    return item ? {lon:p.lon, lat:p.lat, category:item.category, name:item.name, loc:item.loc} : null;
  }).filter(Boolean);
  const pins = resolved.map(d => {
    const [x, y] = project(d.lon, d.lat);
    return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="5" fill="${COLORS[d.category]}" stroke="var(--ink)" stroke-width="0.9"><title>${d.name} — ${d.loc}</title></circle>`;
  }).join('');

  return `<div class="map-card"><svg viewBox="0 0 ${MAP_W} ${MAP_H}" xmlns="http://www.w3.org/2000/svg">
    <rect x="0" y="0" width="${MAP_W}" height="${MAP_H}" fill="var(--map-ocean)" rx="6"/>
    <g fill="var(--map-land)" stroke="var(--ink)" stroke-width="0.8" opacity="0.95">
      ${continentPaths()}
    </g>
    ${pins}
  </svg></div>`;
}
function computeFriendPinData(friend){
  return friendBeenItems(friend.handle)
    .filter(i => i.id && COORDS[i.id])
    .map(i => ({lon:COORDS[i.id].lon, lat:COORDS[i.id].lat, category:i.category, name:i.name, loc:i.loc}));
}

function renderProfileHeader(){
  const tier = currentTier();
  const totalLogged = Object.values(ranked).reduce((n, arr) => n + arr.length, 0);
  const unlockedBadges = unlockedBadgeCount();
  const CHALLENGE_GOAL = 50;
  const CHALLENGE_YEAR = 2026;
  const challengeEnd = new Date(CHALLENGE_YEAR, 11, 31);
  const daysLeft = Math.max(0, Math.ceil((challengeEnd - new Date()) / 86400000));
  const challengePct = Math.min(100, Math.round((totalLogged / CHALLENGE_GOAL) * 100));
  document.getElementById('profile-header').innerHTML = `
    <div class="profile-head">
      <div class="avatar" id="user-avatar" style="${userPhoto ? `background-image:url(${userPhoto}); background-size:cover; background-position:center;` : ''}">
        ${userPhoto ? '' : (myName ? myName[0].toUpperCase() : 'Y')}
        <div style="position:absolute; bottom:-2px; right:-2px; width:20px; height:20px; border-radius:50%; background:var(--brass); border:2px solid var(--parchment); display:flex; align-items:center; justify-content:center;">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--ink)" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.2"/></svg>
        </div>
      </div>
      <input type="file" accept="image/*" id="user-avatar-input" style="display:none;">
      <div style="flex:1;">
        <div class="profile-name">${myName || 'You'}${isAdmin ? '<span class="admin-badge">Jaunt Team</span>' : ''}</div>
        ${myUsername ? `<div class="profile-rank" style="margin:0; font-family:'IBM Plex Mono', monospace;">${myUsername}</div>` : ''}
        <div class="profile-rank">#342 of 12,480 travelers · Top 8% in Nature</div>
        <div style="display:flex; gap:10px; margin-top:3px; font-size:11.5px; color:var(--slate);">
          <button class="follow-count-btn" id="own-followers-btn"><b style="color:var(--ink);">${mockFollowerCount}</b> Followers</button>
          <button class="follow-count-btn" id="own-following-btn"><b style="color:var(--ink);">${youFollowing.size}</b> Following</button>
        </div>
        <span class="profile-tier-chip">${tier.name} · ${totalLogged} logged</span>
      </div>
    </div>
    <div class="admin-toggle-row" style="margin-top:12px;">
      <span>Viewing the app as</span>
      <div style="display:flex; gap:6px; flex-shrink:0;">
        <button class="role-pill ${isAdmin ? 'active' : ''}" id="ph-role-admin">Admin</button>
        <button class="role-pill ${!isAdmin ? 'active' : ''}" id="ph-role-member">Consumer</button>
      </div>
    </div>
    <div style="display:flex; gap:8px; margin-top:12px;">
      <button class="btn btn-outline btn-sm" style="flex:1;" id="open-badges-btn">Badges (${unlockedBadges})</button>
      <button class="btn btn-outline btn-sm" style="flex:1;" id="open-recap-btn">Year in Travel</button>
    </div>
    <button class="btn btn-outline btn-block btn-sm" id="open-quiz-btn" style="margin-top:8px;">Retake taste quiz</button>
    <div class="admin-toggle-row" style="flex-direction:column; align-items:stretch; margin-top:12px;">
      <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:6px;">
        <span style="font-weight:600; color:var(--ink);">${CHALLENGE_YEAR} Travel Challenge</span>
        <span>${totalLogged} of ${CHALLENGE_GOAL} activities</span>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width:${challengePct}%;"></div></div>
      <div style="margin-top:6px;">${daysLeft} days left</div>
    </div>`;
  document.getElementById('open-badges-btn').addEventListener('click', openBadges);
  document.getElementById('open-recap-btn').addEventListener('click', openRecap);
  document.getElementById('open-quiz-btn').addEventListener('click', openTasteQuiz);
  document.getElementById('own-followers-btn').addEventListener('click', () => openFollowList('followers', null));
  document.getElementById('own-following-btn').addEventListener('click', () => openFollowList('following', null));
  document.getElementById('ph-role-admin').addEventListener('click', () => { isAdmin = true; renderAll(); toast('Viewing as Admin'); });
  document.getElementById('ph-role-member').addEventListener('click', () => { isAdmin = false; renderAll(); toast('Viewing as a regular consumer'); });
  document.getElementById('user-avatar').addEventListener('click', () => document.getElementById('user-avatar-input').click());
  document.getElementById('user-avatar-input').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if(!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      userPhoto = ev.target.result;
      renderProfileHeader();
    };
    reader.readAsDataURL(file);
  });
}

function renderMapCaption(pinData){
  const resolved = pinData || computeBeenPins().map(p => {
    const item = findRankedItem(p.id);
    return item ? {loc:item.loc} : null;
  }).filter(Boolean);
  const countries = new Set(resolved.map(d => d.loc.split(',').pop().trim()));
  const legend = Object.keys(LABELS).map(cat => `<span class="legend-dot" style="--c:${COLORS[cat]}">${LABELS[cat]}</span>`).join('');
  return `<div class="map-caption"><span>${resolved.length} places · ${countries.size} countries</span></div>
  <div class="map-legend" style="margin-top:6px;">${legend}</div>`;
}

function renderProfilePills(){
  const pills = [
    {id:'activity', label:'Activity'},
    {id:'been', label:'Been'},
    {id:'want', label:'Want to try'},
    {id:'recs', label:'Recs for you'},
    {id:'trips', label:'Trips'},
    {id:'streaks', label:'Streaks'},
    {id:'breakdown', label:'Breakdown'},
    {id:'leaderboard', label:'Leaderboard'},
    {id:'standing', label:'Standing'}
  ];
  document.getElementById('profile-pills').innerHTML = pills.map(p =>
    `<button class="pill ${profileSubTab===p.id?'active':''}" data-pill="${p.id}">${p.label}</button>`
  ).join('');
  document.querySelectorAll('[data-pill]').forEach(b => b.addEventListener('click', () => {
    profileSubTab = b.dataset.pill;
    renderProfileTab();
  }));
}

function renderProfileTab(){
  if(viewingOtherProfile){
    renderOtherProfile(viewingOtherProfile);
    return;
  }
  renderProfileHeader();
  document.getElementById('taste-map').innerHTML = renderWorldMap() + renderMapCaption();
  renderFirstFinderShowcase();
  renderProfilePills();

  const content = document.getElementById('profile-content');

  if(profileSubTab === 'activity'){
    content.innerHTML = renderActivitySection();
    wireActivitySection();
    return;
  }

  if(profileSubTab === 'standing'){
    content.innerHTML = renderStandingSection();
    wireStandingSection();
    return;
  }

  if(profileSubTab === 'breakdown'){
    content.innerHTML = renderBreakdownSection();
    wireBreakdownSection();
    return;
  }

  if(profileSubTab === 'leaderboard'){
    content.innerHTML = renderLeaderboard();
    wireLeaderboard();
    return;
  }

  if(profileSubTab === 'trips'){
    content.innerHTML = renderTripsSection();
    wireTripsSection();
    return;
  }

  if(profileSubTab === 'streaks'){
    content.innerHTML = renderStreaksSection();
    return;
  }

  content.innerHTML = `<div class="stamps" id="profile-cat-stamps" style="margin:12px 0 14px;"></div><div id="profile-list-inner"></div>`;
  renderStamps('profile-cat-stamps');

  const target = document.getElementById('profile-list-inner');
  if(profileSubTab === 'been'){
    const items = ranked[currentCategory] || [];
    target.innerHTML = items.length ? items.map((i, idx) => rankRowHTML(i, idx, true)).join('') : `<div class="empty"><p>Nothing ranked in ${LABELS[currentCategory]} yet.</p></div>`;
    wireDetailClicks(target, items);
    wireRankRowReorder(target, currentCategory);
  } else if(profileSubTab === 'want'){
    const items = wantToTry[currentCategory] || [];
    target.innerHTML = renderCategoryFilteredListInner(wantToTry, `Nothing bookmarked in ${LABELS[currentCategory]} yet.`);
    wireDetailClicks(target, items);
  } else if(profileSubTab === 'recs'){
    const items = recs[currentCategory] || [];
    target.innerHTML = renderCategoryFilteredListInner(recs, `No recommendations in ${LABELS[currentCategory]} yet.`, i => `<div class="rec-why">${i.why}</div>`);
    wireDetailClicks(target, items);
  }
}

function renderBreakdownSection(){
  const subTabs = [
    {id:'activities', label:'Activities'},
    {id:'cities', label:'Cities'},
    {id:'countries', label:'Countries'}
  ];
  const groups = computeBreakdown(breakdownSubTab);
  const noun = subTabs.find(t => t.id === breakdownSubTab).label;

  return `
    <div class="pill-nav" id="breakdown-subtabs" style="margin-top:0;">
      ${subTabs.map(t => `<button class="pill ${breakdownSubTab===t.id?'active':''}" data-subtab="${t.id}">${t.label}</button>`).join('')}
    </div>
    <div class="breakdown-header">
      <span>${groups.length} ${noun}</span>
      <button class="pill" id="breakdown-sort">Sort: ${breakdownSort === 'count' ? 'Count' : 'Score'}</button>
    </div>
    ${groups.length ? groups.map(g => `
      <div class="breakdown-row" data-group="${g.label}">
        <div>
          <div class="rank-name">${g.label}</div>
          <div class="rank-loc">${g.count} place${g.count>1?'s':''}</div>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          ${avgCircle(g.avg)}
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--slate)" stroke-width="2" style="width:16px;height:16px;"><path d="M9 6l6 6-6 6"/></svg>
        </div>
      </div>`).join('') : `<div class="empty"><p>Nothing ranked yet.</p></div>`}
  `;
}

function wireBreakdownSection(){
  document.querySelectorAll('#breakdown-subtabs .pill').forEach(b => b.addEventListener('click', () => {
    breakdownSubTab = b.dataset.subtab;
    renderProfileTab();
  }));
  document.getElementById('breakdown-sort').addEventListener('click', () => {
    breakdownSort = breakdownSort === 'count' ? 'score' : 'count';
    renderProfileTab();
  });
  const groups = computeBreakdown(breakdownSubTab);
  document.querySelectorAll('[data-group]').forEach(el => {
    const group = groups.find(g => g.label === el.dataset.group);
    if(group) el.addEventListener('click', () => openGroupDetail(group));
  });
}

function openGroupDetail(group){
  document.getElementById('group-modal').innerHTML = `
    <h3 style="font-family:'Fraunces',serif; font-size:18px; color:var(--ink); margin-bottom:2px;">${group.label}</h3>
    <p class="caption" style="text-align:left; margin-bottom:14px;">${group.count} place${group.count>1?'s':''} · avg ${group.avg.toFixed(1)}</p>
    <div id="group-list-inner">${group.items.map((i, idx) => rankRowHTML(i, idx)).join('')}</div>
    <button class="btn btn-brass btn-block" id="group-close" style="margin-top:16px;">Close</button>
  `;
  document.getElementById('group-overlay').classList.add('active');
  document.getElementById('group-close').addEventListener('click', () => document.getElementById('group-overlay').classList.remove('active'));
  wireDetailClicks(document.getElementById('group-list-inner'), group.items);
}
document.getElementById('group-overlay').addEventListener('click', (e) => {
  if(e.target.id === 'group-overlay') document.getElementById('group-overlay').classList.remove('active');
});

function renderCategoryFilteredListInner(dataset, emptyText, extraLineFn){
  const items = [...(dataset[currentCategory] || [])].sort((a,b) =>
    (b.recommendedScore ?? b.avgScore ?? 0) - (a.recommendedScore ?? a.avgScore ?? 0)
  );
  return items.length ? items.map(i => `
    <div class="xcard" data-open-id="${i.id}">
      <div class="xcard-media" style="${mediaStyle(currentCategory, i.photo)}">${i.photo ? '' : itemArt(i, currentCategory)}</div>
      <div class="xcard-body">
        <div class="xcard-top">
          <div>
            <div class="xcard-name">${i.name}</div>
            <div class="xcard-loc">${i.loc}</div>
          </div>
        </div>
        ${extraLineFn ? extraLineFn(i) : `<div class="xcard-blurb">${i.blurb}</div>`}
        ${miniScoreRow(i)}
      </div>
    </div>`).join('') : `<div class="empty"><p>${emptyText}</p></div>`;
}

function renderStandingSection(){
  const tier = currentTier();
  const score = standingScore();
  const perks = perksUnlocked();
  const joinedCount = invites.filter(i => i.status === 'joined').length;
  const resTier = currentResPriorityTier();
  const resNextTier = nextResPriorityTier();
  return `
    <div class="tier-stamp">
      <div class="tier-name">${tier.name}</div>
      <div class="tier-sub">Standing ${score}</div>
    </div>

    <div class="sec-label" style="margin-top:4px;">Profile visibility</div>
    <div class="admin-toggle-row" style="margin-bottom:0;">
      <span>${myProfilePublic ? 'Anyone can search for you and see where you\'ve been.' : 'Only your approved friends can see your activity.'}</span>
      <div style="display:flex; gap:6px; flex-shrink:0;">
        <button class="role-pill ${myProfilePublic ? 'active' : ''}" id="vis-public">Public</button>
        <button class="role-pill ${!myProfilePublic ? 'active' : ''}" id="vis-private">Private</button>
      </div>
    </div>

    <div class="sec-label">Offline mode</div>
    <div class="admin-toggle-row" style="margin-bottom:0;">
      <span>${offlineMode ? 'Showing only downloaded trips and cached content.' : 'Reflects your browser\'s real connection status, or flip it manually to preview the offline experience.'}</span>
      <div style="display:flex; gap:6px; flex-shrink:0;">
        <button class="role-pill ${!offlineMode ? 'active' : ''}" id="offline-off">Online</button>
        <button class="role-pill ${offlineMode ? 'active' : ''}" id="offline-on">Offline</button>
      </div>
    </div>

    <div class="sec-label">Location sharing</div>
    <div class="admin-toggle-row" style="margin-bottom:0;">
      <span>${locationPermission === 'granted' ? 'Jaunt can use your real location for Near You.' : locationPermission === 'denied' ? 'Off — Near You uses manual search instead.' : 'Not asked yet — you\'ll be prompted from Near You in Discover.'}</span>
      ${locationPermission === 'granted' ? `<button class="role-pill active" id="location-revoke">Turn off</button>` : ''}
    </div>

    <div class="sec-label">Notifications</div>
    <div class="admin-toggle-row" style="margin-bottom:0;">
      <span>${notifSettings.enabled ? 'You\'ll hear about activity like this.' : 'Off — you won\'t get alerts in the app.'}</span>
      <div style="display:flex; gap:6px; flex-shrink:0;">
        <button class="role-pill ${!notifSettings.enabled ? 'active' : ''}" id="notif-master-off">Off</button>
        <button class="role-pill ${notifSettings.enabled ? 'active' : ''}" id="notif-master-on">On</button>
      </div>
    </div>
    ${notifSettings.enabled ? `
    <div style="margin-top:8px;">
      ${[['likes','Likes on your posts'],['comments','Comments on your posts'],['invites','Invite activity'],['waitlist','Waitlist & reservation updates'],['tags','Being tagged by friends'],['askReplies','Replies to your questions'],['coPlanner','Added as a trip co-planner']].map(([key,label]) => `
        <div class="stat-row">
          <div class="stat-label">${label}</div>
          <div class="checkbox-box notif-sub-toggle ${notifSettings[key] ? 'checked' : ''}" data-notiftype="${key}">${notifSettings[key] ? CHECK_SVG : ''}</div>
        </div>`).join('')}
    </div>` : ''}
    <p class="caption" style="margin-top:8px; text-align:left;">You can also manage this anytime from your phone's system notification settings.</p>

    <div class="sec-label">Invites</div>
    <div class="stat-row">
      <div class="stat-label">Sent</div>
      <div class="stat-value">${invites.length} / ${user.invitesTotal}</div>
    </div>
    <div class="bar-track"><div class="bar-fill" style="width:${(invites.length/user.invitesTotal)*100}%; background:var(--brass);"></div></div>
    <button class="btn btn-brass btn-block" id="send-invite" style="margin-top:12px;">Send an invite</button>

    ${invites.length ? invites.map(inv => `
      <div class="stat-row">
        <div class="stat-label">${inv.handle}</div>
        ${inv.status === 'joined'
          ? `<span class="perk-status unlocked">Joined</span>`
          : `<button class="btn btn-outline btn-sm" data-join="${inv.id}">Mark as joined (demo)</button>`}
      </div>`).join('') : ''}
    <p class="caption" style="margin-top:6px; text-align:left;">Average score unlocks once an invite you sent actually joins — not just for sending one. Use "Mark as joined" to simulate that, since there's no real signup here yet.</p>

    <div class="sec-label">Reliability</div>
    <div class="stat-row">
      <div class="stat-label">Score</div>
      <div class="stat-value">${user.reliability}%</div>
    </div>
    <div class="bar-track"><div class="bar-fill" style="width:${user.reliability}%;"></div></div>
    <p class="caption" style="margin-top:6px; text-align:left;">Goes up when you release a spot you can't use ahead of time. Goes down on no-shows.</p>

    <div class="sec-label">Perks</div>
    <div class="perk-row">
      <div class="perk-icon ${perks.avgScore ? 'unlocked':'locked'}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M2 12h20"/></svg>
      </div>
      <div class="perk-text">
        <div class="perk-name">Average friend score</div>
        <div class="perk-desc">See how your circle rated a place before you go</div>
      </div>
      <div class="perk-status ${perks.avgScore ? 'unlocked':'locked'}">${perks.avgScore ? 'Unlocked' : 'Invite someone who joins'}</div>
    </div>
    <div class="perk-row">
      <div class="perk-icon ${perks.resPriority ? 'unlocked':'locked'}" style="${resTier ? `background:${TIER_COLORS[resTier.tier]}; border-color:${TIER_COLORS[resTier.tier]};` : ''}">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
      </div>
      <div class="perk-text">
        <div class="perk-name">Reservation priority</div>
        <div class="perk-desc">First in line when a booked spot opens up</div>
      </div>
      <div class="perk-status ${perks.resPriority ? 'unlocked':'locked'}">
        ${resTier ? `${resTier.tier}${resNextTier ? ` · ${invites.filter(i=>i.status==='joined').length}/${resNextTier.threshold} to ${resNextTier.tier}` : ' · Max'}` : (user.reliability < 75 ? '75% reliability required' : `0/${RES_PRIORITY_TIERS[0].threshold} joined invites to Bronze`)}
      </div>
    </div>

    <div class="sec-label">Upcoming</div>
    ${upcoming.length ? upcoming.map(u => `
      <div class="upcoming-card">
        <div class="upcoming-top">
          <div>
            <div class="upcoming-name">${u.name}</div>
            <div class="upcoming-loc">${u.loc}</div>
          </div>
          <div class="upcoming-date">${u.date}</div>
        </div>
        <button class="btn btn-outline btn-sm btn-block" style="margin-top:10px;" data-release="${u.id}">Can't make it — release my spot</button>
      </div>`).join('') : `<p class="caption" style="text-align:left;">Nothing booked right now.</p>`}

    <div class="sec-label">Data &amp; storage</div>
    <p class="caption" style="text-align:left; margin-bottom:8px;">Your rankings, photos, trips, and settings are saved to this browser automatically.</p>
    ${toRank.length ? `<button class="btn btn-outline btn-block" id="clear-torank-btn" style="margin-bottom:8px;">Move all ${toRank.length} pending "to rank" items to the catalog instead</button>` : ''}
    <button class="btn btn-brass btn-block" id="sync-catalog-btn" style="margin-bottom:8px;">Push my local catalog to the shared database</button>
    <p class="caption" style="text-align:left; margin:-2px 0 8px;">One-time sync — sends everything in your catalog to Supabase so anyone with the link sees it too. Safe to run more than once, it skips anything already there.</p>
    <button class="btn btn-outline btn-block" id="export-data-btn" style="margin-bottom:8px;">Download a backup of your data</button>
    <button class="btn btn-outline btn-block" id="reset-data-btn">Reset my personal data</button>
    <p class="caption" style="text-align:left; margin-top:6px;">Clears your rankings, trips, lists, and settings only — the shared activity catalog and guides are untouched.</p>
  `;
}

async function syncLocalCatalogToSupabase(){
  if(!db){
    toast('No live database connection right now — check your network and try again', false);
    return;
  }
  const btn = document.getElementById('sync-catalog-btn');
  if(btn){ btn.disabled = true; btn.textContent = 'Checking what\'s already there...'; }
  try {
    const { data: existing, error: fetchErr } = await db.from('Activities').select('Name');
    if(fetchErr){
      toast('Could not check the shared database — see console', false);
      console.error('[Supabase] Pre-sync fetch failed:', fetchErr);
      if(btn){ btn.disabled = false; btn.textContent = 'Push my local catalog to the shared database'; }
      return;
    }
    const existingNames = new Set((existing || []).map(r => normalizeForMatch(r.Name || r.name)));
    const toInsert = [];
    Object.values(recs).flat().forEach(item => {
      const key = normalizeForMatch(item.name);
      if(existingNames.has(key)) return;
      existingNames.add(key); // guard against duplicates within our own local data too
      toInsert.push({ Name: item.name, Location: item.loc, Category: item.category, Description: item.blurb || '' });
    });

    if(!toInsert.length){
      toast('Everything in your local catalog is already in the shared database');
      if(btn){ btn.disabled = false; btn.textContent = 'Push my local catalog to the shared database'; }
      return;
    }

    if(btn) btn.textContent = `Sending ${toInsert.length} activities...`;
    const { error: insertErr } = await db.from('Activities').insert(toInsert);
    if(insertErr){
      console.error('[Supabase] Bulk sync failed:', insertErr);
      toast('Sync failed — check console for details', false);
    } else {
      toast(`Synced ${toInsert.length} activities to the shared database`);
    }
  } catch(e){
    console.error('[Supabase] Sync crashed:', e);
    toast('Sync failed unexpectedly — check console', false);
  } finally {
    if(btn){ btn.disabled = false; btn.textContent = 'Push my local catalog to the shared database'; }
  }
}
function wireStandingSection(){
  const clearToRankBtn = document.getElementById('clear-torank-btn');
  if(clearToRankBtn) clearToRankBtn.addEventListener('click', () => {
    const count = toRank.length;
    [...toRank].forEach(item => {
      recs[item.category] || (recs[item.category] = []);
      recs[item.category].push({
        id: item.id, name: item.name, loc: item.loc, blurb: item.blurb,
        why: 'Newly added to Jaunt', source: 'Curated',
        recommendedScore: 7.5, avgScore: null,
        trendCount: 0, price: item.price || 2, tags: item.tags || [],
        recSampleSize: null, avgSampleCount: null,
        photo: item.photo || null, coverPhoto: item.coverPhoto || null
      });
    });
    toRank = [];
    renderAll();
    toast(`Moved ${count} items to the catalog — your rank queue is clear`);
  });
  document.getElementById('sync-catalog-btn').addEventListener('click', syncLocalCatalogToSupabase);
  document.getElementById('export-data-btn').addEventListener('click', exportUserData);
  document.getElementById('reset-data-btn').addEventListener('click', () => {
    if(confirm('This clears your personal rankings, trips, lists, and settings, and reloads the app fresh. The shared activity catalog and guides are NOT affected. This can\'t be undone — consider downloading a backup first. Continue?')){
      resetPersonalDataOnly();
    }
  });
  document.getElementById('vis-public').addEventListener('click', () => { myProfilePublic = true; renderProfileTab(); toast('Your profile is now public'); });
  document.getElementById('vis-private').addEventListener('click', () => { myProfilePublic = false; renderProfileTab(); toast('Your profile is now private'); });
  document.getElementById('offline-off').addEventListener('click', () => { offlineMode = false; renderAll(); toast('Back online'); });
  document.getElementById('offline-on').addEventListener('click', () => { offlineMode = true; renderAll(); toast('Simulating offline mode'); });
  const locRevokeBtn = document.getElementById('location-revoke');
  if(locRevokeBtn) locRevokeBtn.addEventListener('click', () => {
    locationPermission = null;
    userCoords = null;
    renderProfileTab();
    toast('Location sharing turned off');
  });
  document.getElementById('notif-master-on').addEventListener('click', () => { notifSettings.enabled = true; renderProfileTab(); renderNotifBadge(); toast('Notifications turned on'); });
  document.getElementById('notif-master-off').addEventListener('click', () => { notifSettings.enabled = false; renderProfileTab(); renderNotifBadge(); toast('Notifications turned off'); });
  document.querySelectorAll('.notif-sub-toggle').forEach(box => box.addEventListener('click', () => {
    const key = box.dataset.notiftype;
    notifSettings[key] = !notifSettings[key];
    renderProfileTab();
  }));
  document.getElementById('send-invite').addEventListener('click', () => {
    if(invites.length >= user.invitesTotal){ toast('No invites left this cycle', false); return; }
    const usedHandles = invites.map(i => i.handle);
    const next = INVITE_POOL.find(h => !usedHandles.includes(h));
    if(!next){ toast('No one left in your contacts to invite', false); return; }
    invites.push({id:'inv' + Date.now(), handle: next, status:'sent'});
    renderAll();
    toast(`Invite sent to ${next}`);
  });
  document.querySelectorAll('[data-join]').forEach(b => b.addEventListener('click', () => {
    const inv = invites.find(i => i.id === b.dataset.join);
    if(!inv) return;
    const wasAnyJoinedBefore = invites.some(i => i.status === 'joined');
    inv.status = 'joined';
    renderAll();
    toast(wasAnyJoinedBefore ? `${inv.handle} joined` : `${inv.handle} joined — average scores unlocked!`);
  }));
  document.querySelectorAll('[data-release]').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.release;
    upcoming = upcoming.filter(u => u.id !== id);
    user.reliability = Math.min(100, user.reliability + 4);
    renderProfileTab();
    toast('Spot released — reliability +4');
  }));
}

document.getElementById('profile-btn').addEventListener('click', () => {
  document.querySelector('.nav-item[data-tab="profile"]').click();
});
document.getElementById('notif-btn').addEventListener('click', openNotifications);
document.getElementById('leaderboard-btn').addEventListener('click', () => {
  viewingOtherProfile = null;
  profileSubTab = 'leaderboard';
  switchToScreen('profile');
  renderAll();
});
document.getElementById('msg-btn').addEventListener('click', () => {
  renderConvoList();
  document.getElementById('msg-overlay').classList.add('active');
});

/* ---------------- NAV ---------------- */
function updateNavVisibility(){
  const queueNav = document.querySelector('.nav-item[data-tab="queue"]');
  queueNav.style.display = isAdmin ? 'flex' : 'none';
  if(!isAdmin && document.getElementById('screen-queue').classList.contains('active')){
    document.querySelector('.nav-item[data-tab="feed"]').click();
  }
}

function renderToRankCleanupBanner(){
  // Deliberately isolated and defensive: this must be able to fix a stuck
  // rank queue even if something else on Profile/Standing is broken, so it
  // never depends on any other render function succeeding, and never throws
  // outward if the legacy data it's cleaning up is malformed.
  try {
    const el = document.getElementById('torank-cleanup-banner');
    if(!el) return;
    if(toRank.length > 15){
      el.innerHTML = `
        <div class="invite-card" style="background:var(--signal); margin-bottom:14px;">
          <div class="invite-card-title" style="color:#fff;">${toRank.length} items are stuck in your personal rank queue</div>
          <div class="invite-card-sub" style="color:#fff; opacity:0.9;">This usually happens when older bulk-approved activities got added as personal rankings by mistake, before catalog approval existed as a separate option.</div>
          <button class="btn btn-block" style="background:#fff; color:var(--signal); margin-top:10px; font-weight:700;" id="cleanup-torank-now">Move them all to the catalog instead</button>
        </div>`;
      document.getElementById('cleanup-torank-now').addEventListener('click', () => {
        try {
          const count = toRank.length;
          [...toRank].forEach(item => {
            const cat = (item && item.category) || 'exploration';
            recs[cat] || (recs[cat] = []);
            recs[cat].push({
              id: (item && item.id) || ('legacy' + Date.now() + Math.random()),
              name: (item && item.name) || 'Untitled activity',
              loc: (item && item.loc) || 'Unknown location',
              blurb: (item && item.blurb) || '',
              why: 'Newly added to Jaunt', source: 'Curated',
              recommendedScore: 7.5, avgScore: null, trendCount: 0,
              price: (item && item.price) || 2, tags: (item && item.tags) || [],
              recSampleSize: null, avgSampleCount: null,
              photo: (item && item.photo) || null, coverPhoto: (item && item.coverPhoto) || null
            });
          });
          toRank = [];
          renderAll();
          toast(`Moved ${count} items to the catalog — your rank queue is clear`);
        } catch(innerErr){
          toast("Something's blocking the cleanup — try Reset all app data in Standing as a last resort", false);
        }
      });
    } else {
      el.innerHTML = '';
    }
  } catch(outerErr){ /* never let this block the rest of the app from rendering */ }
}
function renderAll(){
  renderToRankCleanupBanner();
  updateNavVisibility();
  updateOfflineUI();
  renderFeed();
  renderDiscover();
  renderSearchScreen();
  renderList();
  renderQueue();
  renderRank();
  renderProfileTab();
  renderNotifBadge();
  scheduleSave();
}

function renderSearchScreen(){
  const banner = document.getElementById('rank-entry-banner');
  banner.innerHTML = toRank.length ? `
    <div class="rank-entry-card" id="rank-entry-card">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M8 3v13M8 16l-3-3M8 16l3-3M16 21V8M16 8l-3 3M16 8l3 3"/></svg>
      <div style="flex:1;">
        <div class="rank-name">You have ${toRank.length} place${toRank.length>1?'s':''} to rank</div>
        <div class="rank-loc">Tap to log how it was and compare it against your list</div>
      </div>
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--slate)" stroke-width="2" style="width:16px;height:16px;"><path d="M9 6l6 6-6 6"/></svg>
    </div>` : '';
  const rankCard = document.getElementById('rank-entry-card');
  if(rankCard) rankCard.addEventListener('click', () => switchToScreen('rank'));

  const recentsEl = document.getElementById('recents-list');
  recentsEl.innerHTML = recentlyViewed.length ? recentlyViewed.map(i => `
    <div class="recent-row" data-open-id="${i.id}">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
      <div style="flex:1;"><div class="rank-name" style="font-size:13px;">${i.name}</div><div class="rank-loc">${i.loc}</div></div>
    </div>`).join('') : `<p class="caption" style="text-align:left;">Places you look at will show up here.</p>`;
  wireDetailClicks(recentsEl, recentlyViewed);

  const suggestEl = document.getElementById('search-suggestions-list');
  const suggestions = allCatalogItems().filter(i => i.bucket === 'Want to try')
    .sort((a,b) => (b.recommendedScore ?? b.avgScore ?? 0) - (a.recommendedScore ?? a.avgScore ?? 0))
    .slice(0,4);
  suggestEl.innerHTML = suggestions.length ? suggestions.map(i => `
    <div class="recent-row" data-open-id="${i.id}">
      <div style="width:28px;height:28px;border-radius:7px;flex-shrink:0;${mediaStyle(i.category, i.photo)}"></div>
      <div style="flex:1;"><div class="rank-name" style="font-size:13px;">${i.name}</div><div class="rank-loc">${i.loc}</div></div>
    </div>`).join('') : `<p class="caption" style="text-align:left;">Nothing bookmarked yet.</p>`;
  wireDetailClicks(suggestEl, suggestions);
}

function switchToScreen(tabId){
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const navBtn = document.querySelector(`.nav-item[data-tab="${tabId}"]`);
  if(navBtn) navBtn.classList.add('active');
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById('screen-' + tabId).classList.add('active');
  document.getElementById('fab-add').style.display = (tabId === 'discover' || tabId === 'list') ? 'flex' : 'none';
}
document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => {
    // Tapping the Profile tab always means "show my own profile" — reset any
    // stuck state from having viewed someone else's profile earlier, since
    // that should only be reachable via openPublicProfile, not this tab.
    if(btn.dataset.tab === 'profile') viewingOtherProfile = null;
    switchToScreen(btn.dataset.tab);
    if(btn.dataset.tab === 'profile') renderProfileTab();
  });
});

/* ---------------- MODAL ---------------- */
const overlay = document.getElementById('modal-overlay');
let submitPhoto = null;
function wireSubmitPhotoBox(){
  const trigger = document.getElementById('submit-photo-trigger');
  if(trigger) trigger.addEventListener('click', () => document.getElementById('submit-photo-input').click());
  const removeBtn = document.getElementById('submit-photo-remove');
  if(removeBtn) removeBtn.addEventListener('click', () => { submitPhoto = null; renderSubmitPhotoArea(); });
}
function renderSubmitPhotoArea(){
  const area = document.getElementById('submit-photo-area');
  area.innerHTML = submitPhoto
    ? `<div class="photo-preview-wrap"><img class="photo-preview" src="${submitPhoto}"><button class="photo-remove" id="submit-photo-remove">✕</button></div>`
    : `<div class="photo-box" id="submit-photo-trigger">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="12" cy="12" r="3.2"/><path d="M8 5l1.5-2h5L16 5"/></svg>
        Tap to add a photo
      </div>`;
  wireSubmitPhotoBox();
}
document.getElementById('submit-photo-input').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if(!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => { submitPhoto = ev.target.result; renderSubmitPhotoArea(); };
  reader.readAsDataURL(file);
});
wireSubmitPhotoBox();

let submitCategory = 'exploration';
function renderCategoryPickGrid(){
  const grid = document.getElementById('f-category-grid');
  grid.innerHTML = Object.keys(LABELS).map(cat => `
    <button type="button" class="category-pick-btn ${submitCategory===cat ? 'selected' : ''}" data-catpick="${cat}">
      ${ICONS[cat]}${LABELS[cat]}
    </button>`).join('');
  grid.querySelectorAll('[data-catpick]').forEach(b => b.addEventListener('click', () => {
    submitCategory = b.dataset.catpick;
    renderCategoryPickGrid();
  }));
}
function openSubmitModal(prefillName){
  document.getElementById('f-name').value = prefillName || '';
  submitCategory = 'exploration';
  renderCategoryPickGrid();
  renderFirstFinderPreview();
  document.getElementById('submit-processing-area').style.display = 'none';
  document.getElementById('submit-processing-area').innerHTML = '';
  document.getElementById('submit-action-row').style.display = 'flex';
  overlay.classList.add('active');
}
document.getElementById('fab-add').addEventListener('click', () => openSubmitModal());
document.getElementById('modal-cancel').addEventListener('click', () => {
  overlay.classList.remove('active');
  submitPhoto = null;
  renderSubmitPhotoArea();
});

/* ---- Submission pipeline: duplicate check + mock affiliate matching ----
   Nothing here calls a real Viator/GetYourGuide API — there's no live server-side
   connection wired into this client (and API keys shouldn't live in client code
   anyway). This simulates the sequence against a small mock product list so the
   UX can be designed and tested ahead of a real backend integration. */
function normalizeForMatch(s){ return (s || '').toLowerCase().trim().replace(/[^a-z0-9 ]/g, ''); }
function findLikelyDuplicate(name, loc){
  const target = normalizeForMatch(name);
  const targetLoc = normalizeForMatch(loc);
  const all = [...Object.values(ranked).flat(), ...Object.values(recs).flat(), ...pending];
  for(const item of all){
    const itemName = normalizeForMatch(item.name);
    if(!itemName) continue;
    if(itemName === target) return item;
    const nameWords = new Set(target.split(' ').filter(Boolean));
    const itemWords = new Set(itemName.split(' ').filter(Boolean));
    if(!nameWords.size || !itemWords.size) continue;
    const overlap = [...nameWords].filter(w => itemWords.has(w)).length;
    const itemLoc = normalizeForMatch(item.loc);
    const sameLoc = itemLoc && targetLoc && (itemLoc.includes(targetLoc.split(' ')[0]) || targetLoc.includes(itemLoc.split(' ')[0]));
    if(overlap / Math.min(nameWords.size, itemWords.size) >= 0.6 && sameLoc) return item;
  }
  return null;
}
const AFFILIATE_MOCK_CATALOG = [
  {name:'Great Barrier Reef Scuba Dive', source:'Viator'},
  {name:'Skydive Interlaken', source:'GetYourGuide'},
  {name:'Nevis Bungy Jump', source:'Viator'},
  {name:'Serengeti Safari Day Trip', source:'GetYourGuide'},
  {name:'Grand Canyon Rim Trail Tour', source:'Viator'},
  {name:'Machu Picchu Guided Trek', source:'GetYourGuide'},
  {name:'Eiffel Tower Skip the Line Tour', source:'Viator'},
  {name:'Blue Lagoon Iceland Entry', source:'GetYourGuide'}
];
function findMockAffiliateMatch(name){
  const targetWords = new Set(normalizeForMatch(name).split(' ').filter(Boolean));
  for(const prod of AFFILIATE_MOCK_CATALOG){
    const prodWords = new Set(normalizeForMatch(prod.name).split(' ').filter(Boolean));
    const overlap = [...targetWords].filter(w => prodWords.has(w)).length;
    if(overlap >= 2) return prod;
  }
  return null;
}
function renderProcessingStep(msg){
  document.getElementById('submit-processing-area').innerHTML = `
    <div class="processing-step"><div class="mini-spinner"></div><span>${msg}</span></div>`;
}
function finalizeSubmission(draft, extra){
  pending.push({ id:'p' + Date.now(), ...draft, ...(extra || {}) });
  document.getElementById('f-name').value = '';
  document.getElementById('f-location').value = '';
  document.getElementById('f-desc').value = '';
  document.getElementById('f-license').checked = false;
  submitPhoto = null;
  renderSubmitPhotoArea();
  overlay.classList.remove('active');
  renderAll();
  toast(extra && extra.bookingUrl ? 'Submitted with an instant-booking match!' : 'Submitted — awaiting approval');
}
function showDuplicateWarning(draft, dup){
  document.getElementById('submit-processing-area').innerHTML = `
    <div class="processing-outcome">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" style="color:var(--brass-dark);"><path d="M12 9v4M12 17h.01M10.3 3.9L1.8 18a2 2 0 001.7 3h17a2 2 0 001.7-3L13.7 3.9a2 2 0 00-3.4 0z"/></svg>
      <div><b>This might already exist:</b> ${dup.name} (${dup.loc})</div>
    </div>
    <div style="display:flex; gap:8px; margin-top:10px;">
      <button class="btn btn-outline" style="flex:1;" id="dup-view-existing">View existing</button>
      <button class="btn btn-brass" style="flex:1;" id="dup-submit-anyway">Submit anyway</button>
    </div>`;
  document.getElementById('dup-view-existing').addEventListener('click', () => {
    overlay.classList.remove('active');
    openDetail(dup);
  });
  document.getElementById('dup-submit-anyway').addEventListener('click', () => runAffiliateCheck(draft));
}
function showAffiliateMatchSuccess(draft, match){
  const bookingUrl = `https://www.${match.source.toLowerCase().replace(/\s/g,'')}.com/mock-listing`;
  document.getElementById('submit-processing-area').innerHTML = `
    <div class="processing-outcome success">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 13l4 4L19 7"/></svg>
      <div><b>Match found on ${match.source}</b> — this can offer instant booking.</div>
    </div>
    <div class="booking-preview-card">
      <div class="booking-preview-name">${draft.name}</div>
      <div class="booking-preview-loc">${draft.loc}</div>
      <button class="btn btn-brass btn-block" style="margin-top:8px;" disabled>Book Now (preview — not a live link)</button>
    </div>
    <button class="btn btn-outline btn-block" style="margin-top:10px;" id="aff-continue">Continue</button>`;
  document.getElementById('aff-continue').addEventListener('click', () => finalizeSubmission(draft, { bookingUrl, affiliateSource: match.source }));
}
function runAffiliateCheck(draft){
  renderProcessingStep('Cross-referencing Viator & GetYourGuide APIs...');
  setTimeout(() => {
    const match = findMockAffiliateMatch(draft.name);
    if(match) showAffiliateMatchSuccess(draft, match);
    else finalizeSubmission(draft);
  }, 900);
}
document.getElementById('modal-submit').addEventListener('click', () => {
  const name = document.getElementById('f-name').value.trim();
  const loc = document.getElementById('f-location').value.trim();
  const category = submitCategory;
  const desc = document.getElementById('f-desc').value.trim();
  const licensed = document.getElementById('f-license').checked;
  if(!name || !loc){ toast('Add a name and location', false); return; }
  const draft = {
    name, loc, category,
    blurb: desc || 'No description provided.',
    submitter:'@you',
    photo: submitPhoto,
    licensed: !!(submitPhoto && licensed)
  };
  document.getElementById('submit-action-row').style.display = 'none';
  document.getElementById('submit-processing-area').style.display = 'block';
  renderProcessingStep('Checking for existing activities...');
  setTimeout(() => {
    const dup = findLikelyDuplicate(name, loc);
    if(dup){ showDuplicateWarning(draft, dup); return; }
    runAffiliateCheck(draft);
  }, 900);
});

document.getElementById('search-input').addEventListener('input', (e) => {
  renderSearchResults(e.target.value);
});
document.getElementById('feed-search-input').addEventListener('focus', (e) => {
  e.target.blur(); // keep typing on the real Search screen, not here
  const query = e.target.value;
  switchToScreen('search');
  const realInput = document.getElementById('search-input');
  realInput.value = query;
  realInput.focus();
  if(query) renderSearchResults(query);
});
document.getElementById('feed-search-input').addEventListener('input', (e) => {
  // covers typing that lands before the focus handler above redirects on some browsers
  const query = e.target.value;
  switchToScreen('search');
  const realInput = document.getElementById('search-input');
  realInput.value = query;
  realInput.focus();
  e.target.value = '';
  if(query) renderSearchResults(query);
});
document.getElementById('near-you-input').addEventListener('input', (e) => {
  nearYouQuery = e.target.value;
  renderNearYouSuggestions();
});
document.getElementById('header-new-list-btn').addEventListener('click', () => openCreateListForm(null));
document.getElementById('list-tab-new-list-btn').addEventListener('click', () => openCreateListForm(null));
document.getElementById('rank-back-btn').addEventListener('click', () => switchToScreen('search'));
function getBookableItems(){
  return allCatalogItems().filter(i => i.bookingUrl);
}
function renderBookNowResults(){
  const el = document.getElementById('search-results');
  const searchMain = document.getElementById('search-main');
  const filterRow = document.getElementById('search-filter-row');
  searchMain.style.display = 'none';
  filterRow.style.display = 'none';
  const items = getBookableItems();
  el.innerHTML = `
    <button class="btn btn-outline btn-sm" id="book-now-exit" style="margin-bottom:10px;">← Back to search</button>
    <div class="sec-label" style="margin-top:0;">Instantly bookable</div>
    ${items.length ? items.map(i => `
      <div class="search-result-row" data-open-id="${i.id}">
        <div style="width:34px;height:34px;border-radius:8px;flex-shrink:0;${mediaStyle(i.category, i.photo)}"></div>
        <div style="flex:1;">
          <div class="search-result-name">${i.name}</div>
          <div class="search-result-loc">${i.loc}</div>
        </div>
        <span class="search-badge" style="background:var(--trail); color:#fff; border-color:var(--trail);">Book Now</span>
      </div>`).join('') : `<div class="empty"><p>Nothing's matched a booking partner yet — this fills in automatically as submissions get matched during review.</p></div>`}
  `;
  wireDetailClicks(el, items);
  document.getElementById('book-now-exit').addEventListener('click', () => renderSearchResults(document.getElementById('search-input').value));
}
document.getElementById('qp-book').addEventListener('click', renderBookNowResults);
/* ================= PERSISTENCE ================= */
// Photos (base64 data URLs) go in IndexedDB since they can get large;
// everything else is small enough for localStorage. A generic walker finds
// any data: URL anywhere in the state tree, so it doesn't need to know
// every specific field name (item.photo, item.photos[], coverPhoto, etc).
const IDB_NAME = 'jaunt-photos-db';
const IDB_STORE = 'photos';
let idbPromise = null;
function openIDB(){
  if(idbPromise) return idbPromise;
  idbPromise = new Promise((resolve) => {
    if(typeof indexedDB === 'undefined'){ resolve(null); return; }
    try {
      const req = indexedDB.open(IDB_NAME, 1);
      req.onupgradeneeded = () => { req.result.createObjectStore(IDB_STORE); };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch(e){ resolve(null); }
  });
  return idbPromise;
}
async function idbSetAll(entries){
  const db = await openIDB();
  if(!db || !Object.keys(entries).length) return;
  return new Promise((resolve) => {
    const tx = db.transaction(IDB_STORE, 'readwrite');
    const store = tx.objectStore(IDB_STORE);
    Object.entries(entries).forEach(([id, val]) => store.put(val, id));
    tx.oncomplete = () => resolve();
    tx.onerror = () => resolve();
  });
}
async function idbGetAll(){
  const db = await openIDB();
  if(!db) return {};
  return new Promise((resolve) => {
    const tx = db.transaction(IDB_STORE, 'readonly');
    const store = tx.objectStore(IDB_STORE);
    const out = {};
    const cursorReq = store.openCursor();
    cursorReq.onsuccess = (e) => {
      const cursor = e.target.result;
      if(cursor){ out[cursor.key] = cursor.value; cursor.continue(); }
      else resolve(out);
    };
    cursorReq.onerror = () => resolve(out);
  });
}
function simpleHash(str){
  let hash = 0;
  for(let i = 0; i < str.length; i++){
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return 'ph_' + Math.abs(hash).toString(36) + '_' + str.length;
}
function walkAndExtractDataUrls(value, idbMap){
  if(typeof value === 'string' && value.startsWith('data:')){
    const id = simpleHash(value);
    idbMap[id] = value;
    return 'idbref://' + id;
  }
  if(Array.isArray(value)) return value.map(v => walkAndExtractDataUrls(v, idbMap));
  if(value && typeof value === 'object'){
    const out = {};
    for(const k in value) out[k] = walkAndExtractDataUrls(value[k], idbMap);
    return out;
  }
  return value;
}
function walkAndRestoreDataUrls(value, idbData){
  if(typeof value === 'string' && value.startsWith('idbref://')){
    return idbData[value.slice('idbref://'.length)] || null;
  }
  if(Array.isArray(value)) return value.map(v => walkAndRestoreDataUrls(v, idbData));
  if(value && typeof value === 'object'){
    const out = {};
    for(const k in value) out[k] = walkAndRestoreDataUrls(value[k], idbData);
    return out;
  }
  return value;
}
const PERSIST_STORAGE_KEY = 'jaunt-app-state-v1';
function gatherStateForSave(){
  return {
    ranked, wantToTry, pending, toRank, feedPosts, trips, myLists, guides, recs,
    myName, myUsername, notifSettings, notifications, invites, reports, conversations, user,
    isAdmin, myProfilePublic, locationPermission, userPhoto,
    dismissedOnThisDay, lastSeenFeedPostCount, firstFinderCount,
    youFollowing: Array.from(youFollowing),
    revealedPerks: Array.from(revealedPerks)
  };
}
function applyLoadedState(state){
  if(!state) return;
  if(state.ranked) ranked = state.ranked;
  if(state.wantToTry) wantToTry = state.wantToTry;
  if(state.pending) pending = state.pending;
  if(state.toRank) toRank = state.toRank;
  if(state.feedPosts) feedPosts = state.feedPosts;
  if(state.trips) trips = state.trips;
  if(state.myLists) myLists = state.myLists;
  if(state.guides) guides = state.guides;
  if(state.recs) recs = state.recs;
  if(state.myName !== undefined) myName = state.myName;
  if(state.myUsername !== undefined) myUsername = state.myUsername;
  if(state.notifSettings) notifSettings = state.notifSettings;
  if(state.notifications) notifications = state.notifications;
  if(state.invites) invites = state.invites;
  if(state.reports) reports = state.reports;
  if(state.conversations) conversations = state.conversations;
  if(state.user) user = state.user;
  if(state.isAdmin !== undefined) isAdmin = state.isAdmin;
  if(state.myProfilePublic !== undefined) myProfilePublic = state.myProfilePublic;
  if(state.locationPermission !== undefined) locationPermission = state.locationPermission;
  if(state.userPhoto !== undefined) userPhoto = state.userPhoto;
  if(state.dismissedOnThisDay !== undefined) dismissedOnThisDay = state.dismissedOnThisDay;
  if(state.lastSeenFeedPostCount !== undefined) lastSeenFeedPostCount = state.lastSeenFeedPostCount;
  if(state.firstFinderCount !== undefined) firstFinderCount = state.firstFinderCount;
  if(state.revealedPerks) revealedPerks = new Set(state.revealedPerks);
  if(state.youFollowing) youFollowing = new Set(state.youFollowing);
}
let saveTimer = null;
function scheduleSave(){
  if(saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(saveStateNow, 600);
}
async function saveStateNow(){
  try {
    const idbMap = {};
    const serializable = walkAndExtractDataUrls(gatherStateForSave(), idbMap);
    localStorage.setItem(PERSIST_STORAGE_KEY, JSON.stringify(serializable));
    await idbSetAll(idbMap);
  } catch(e){
    console.error('Save failed', e);
    if(e && e.name === 'QuotaExceededError'){
      toast('Storage is full — some recent changes may not be saved', false);
    }
  }
}
async function loadStateOnStartup(){
  try {
    const raw = localStorage.getItem(PERSIST_STORAGE_KEY);
    if(!raw) return false;
    const parsed = JSON.parse(raw);
    const idbData = await idbGetAll();
    applyLoadedState(walkAndRestoreDataUrls(parsed, idbData));
    return true;
  } catch(e){
    console.error('Failed to load saved state', e);
    return false;
  }
}
function resetPersonalDataOnly(){
  // Deliberately scoped: this resets YOUR rankings, trips, lists, and settings,
  // but leaves the shared catalog (recs, guides) and the seeded social feed
  // (feedPosts, conversations) untouched — those represent content other users
  // would also see in a real multi-user version, not just your own data.
  ranked = {exploration:[], nature:[], adrenaline:[], leisure:[], culture:[]};
  wantToTry = {exploration:[], nature:[], adrenaline:[], leisure:[], culture:[]};
  pending = [];
  toRank = [];
  trips = [];
  myLists = [];
  myName = null;
  myUsername = null;
  notifSettings = { enabled: null, likes: true, comments: true, invites: true, waitlist: true, tags: true, askReplies: true, coPlanner: true };
  invites = [];
  reports = [];
  user = { invitesTotal: 5, reliability: 78 };
  isAdmin = true;
  myProfilePublic = true;
  locationPermission = null;
  userCoords = null;
  userPhoto = null;
  dismissedOnThisDay = null;
  lastSeenFeedPostCount = null;
  firstFinderCount = 0;
  youFollowing = new Set(FRIENDS.map(f => f.id));
  revealedPerks = new Set();
  saveStateNow();
  location.reload();
}
function exportUserData(){
  try {
    const state = gatherStateForSave();
    const json = JSON.stringify(state, null, 2);
    const blob = new Blob([json], {type:'application/json'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `jaunt-backup-${new Date().toISOString().slice(0,10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast('Backup downloaded');
  } catch(e){
    console.error('Export failed', e);
    toast('Could not create backup — try again', false);
  }
}

/* ================= INIT ================= */
document.getElementById('qp-nearby').addEventListener('click', () => switchToScreen('discover'));
document.getElementById('qp-trending').addEventListener('click', () => switchToScreen('discover'));
document.getElementById('ask-friends-btn').addEventListener('click', openAskFriends);

// Real connectivity tracking — reflects the browser's actual network status,
// on top of the manual Online/Offline toggle in Standing for demo purposes.
if(typeof navigator !== 'undefined' && 'onLine' in navigator){
  offlineMode = !navigator.onLine;
}
window.addEventListener('online', () => { offlineMode = false; renderAll(); toast('Back online'); });
window.addEventListener('offline', () => { offlineMode = true; renderAll(); toast('Connection lost — showing downloaded content'); });

const CATEGORY_ALIAS_MAP = {
  exploration:'exploration', nature:'nature', adrenaline:'adrenaline', leisure:'leisure', culture:'culture',
  landmark:'culture', history:'culture', wildlife:'nature', adventure:'adrenaline', scenic:'exploration', relaxation:'leisure'
};
async function loadCatalogFromSupabase(){
  // Read-only: this pulls the shared catalog from your live database so anyone
  // opening the app sees the same activities, regardless of their own browser's
  // storage. It only ever adds to `recs` — it never touches personal data, and
  // never writes back to Supabase (see the note on why writes stay local for now).
  if(!db){
    console.warn('Skipping live catalog load — no Supabase connection available');
    return;
  }
  try {
    const { data, error } = await db.from('Activities').select('*');
    if(error){
      console.error('Supabase fetch failed:', error);
      return;
    }
    if(!data || !data.length) return;

    const seen = new Set();
    Object.values(recs).flat().forEach(i => seen.add(normalizeForMatch(i.name)));

    let added = 0;
    data.forEach((row, idx) => {
      const name = (row.Name || row.name || '').trim();
      const loc = (row.Location || row.location || '').trim();
      const rawCat = (row.Category || row.category || '').trim().toLowerCase();
      const desc = (row.Description || row.description || '').trim();
      if(!name || !loc) return;
      const key = normalizeForMatch(name);
      if(seen.has(key)) return; // skip anything already in the hardcoded catalog
      seen.add(key);
      const cat = CATEGORY_ALIAS_MAP[rawCat] || (LABELS[rawCat] ? rawCat : 'exploration');
      recs[cat] = recs[cat] || [];
      recs[cat].push({
        id: 'sb' + (row.id !== undefined && row.id !== null ? row.id : idx),
        name, loc, blurb: desc,
        why: 'Newly added to Jaunt', source: 'Curated',
        recommendedScore: 7.5, avgScore: null, trendCount: 0,
        price: 2, tags: [], recSampleSize: null, avgSampleCount: null,
        photo: null, coverPhoto: null
      });
      added++;
    });
    if(added > 0){
      renderAll();
      console.log(`Loaded ${added} new activities from Supabase`);
    }
  } catch(e){
    console.error('Supabase load crashed — app continues with local data', e);
  }
}
async function initApp(){
  const hadSavedState = await loadStateOnStartup();
  renderAll();
  if(!hadSavedState || myName === null || myUsername === null){
    setTimeout(openNameStep, 500); // simulates first-launch onboarding
  }
  loadCatalogFromSupabase(); // fire-and-forget — app works fully before this resolves
}
initApp();