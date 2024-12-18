"use strict";(self.webpackChunkmovies_now=self.webpackChunkmovies_now||[]).push([[107],{317:(s,e,i)=>{i.d(e,{A:()=>l});i(43);var t=i(579);function l(s){let{playlists:e,onAdd:i,onClose:l,position:a}=s;return(0,t.jsxs)("div",{className:"popup-container",style:{top:a.top,left:a.left},children:[(0,t.jsx)("h3",{children:"Select a Playlist"}),(0,t.jsx)("ul",{children:e.map((s=>(0,t.jsx)("li",{children:(0,t.jsx)("button",{onClick:()=>{console.log("Adding to Playlist ID:",s.id),i?i(s.id):console.error("onAdd function is missing")},children:s.name})},s.id)))}),(0,t.jsx)("button",{className:"close-btn",onClick:l,children:"Close"})]})}},107:(s,e,i)=>{i.r(e),i.d(e,{default:()=>r});var t=i(43),l=i(216),a=i(317),o=i(910),n=i(929),d=i(579);function r(s){var e;let{playlists:i,setPlaylists:r,addMovieToPlaylist:c,addShowToPlaylist:m}=s;const{id:p}=(0,l.g)(),h=(0,l.Zp)(),[v,g]=(0,t.useState)(!1),[x,j]=(0,t.useState)(!1),[u,f]=(0,t.useState)(null),[N,y]=(0,t.useState)({top:0,left:0}),[b,w]=(0,t.useState)(null),k=i.find((s=>s.id===parseInt(p)));if(!k)return(0,d.jsx)("p",{children:"Playlist not found"});const C=s=>{v&&w(s)},_=s=>{v&&s.preventDefault()},P=(s,e)=>{if(!v||null===b||b===s)return;const i=[...k[e]],[t]=i.splice(b,1);i.splice(s,0,t),r((s=>s.map((s=>s.id===k.id?{...s,[e]:i}:s)))),w(null)},A=(s,e)=>{console.log("Opening popup for show:",s);const i=e.target.getBoundingClientRect();y({top:i.bottom+window.scrollY,left:i.left+window.scrollX}),f(s),j(!0)},D=s=>{h(`/details/${s.type}/${s.id}`)};return(0,d.jsx)("div",{children:(0,d.jsxs)("div",{className:"playlist-detail",children:[(0,d.jsxs)("div",{className:"top-bar",children:[(0,d.jsx)("button",{onClick:()=>h(-1),className:"back-arrow",children:"\u2190 Back"}),(0,d.jsx)("button",{onClick:()=>g(!v),className:"edit-button",children:v?"Done":"Edit"})]}),(0,d.jsxs)("div",{className:"playlist-info",children:[(0,d.jsx)("img",{className:"playlist-image",src:k.image||"default.jpg",alt:"Add movies/shows!"}),(0,d.jsx)("h2",{children:k.name}),(0,d.jsx)("p",{children:k.description}),v&&(0,d.jsxs)("div",{className:"action-buttons",children:[(0,d.jsx)("button",{onClick:()=>{if(k.movies.length>0){const s=`https://image.tmdb.org/t/p/w500${k.movies[0].poster_path}`;r((e=>e.map((e=>e.id===k.id?{...e,image:s}:e))))}else alert("No movies in the playlist to set as an image.")},className:"save-img-button",children:"Save Playlist Image"}),(0,d.jsx)("button",{onClick:()=>{window.confirm("Are you sure you want to delete this playlist?")&&(r(i.filter((s=>s.id!==k.id))),h("/playlists"))},className:"delete-playlist-button",children:"Delete Playlist"})]}),v&&(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("div",{className:"info-box left-info",children:(0,d.jsxs)("p",{children:["Use the ",(0,d.jsx)("strong",{children:"Save Playlist Image"})," button to save the first movie's image as the playlist cover."]})}),(0,d.jsx)("div",{className:"info-box right-info",children:(0,d.jsx)("p",{children:"Drag and drop movies or shows to rearrange their order. This feature is only available in edit mode."})})]})]}),(0,d.jsxs)("div",{className:"playlist-movies",children:[k.movies.map(((s,e)=>(0,d.jsxs)("div",{className:"film-card",draggable:v,onDragStart:()=>C(e),onDragOver:_,onDrop:()=>P(e,"movies"),onClick:()=>D(s),children:[(0,d.jsx)("img",{src:`https://image.tmdb.org/t/p/w500${s.poster_path}`,alt:s.title||s.name}),(0,d.jsx)("h3",{children:s.title||s.name}),v&&(0,d.jsx)("button",{onClick:e=>{e.stopPropagation(),r((e=>e.map((e=>e.id===k.id?{...e,movies:e.movies.filter((e=>e.id!==s.id))}:e))))},className:"add-movie",children:"Delete Movie"}),(0,d.jsxs)("button",{onClick:e=>{e.stopPropagation(),A(s,e)},className:"add-movie",children:[(0,d.jsx)(o.g,{className:"list-img",icon:n.ITF}),(0,d.jsx)("p",{children:"Add to Playlist"})]}),(0,d.jsxs)("div",{className:"stars",children:[(0,d.jsx)("p",{className:"p1",children:s.release_date?s.release_date.slice(0,4):"N/A"}),(0,d.jsxs)("div",{className:"p2",children:[(0,d.jsx)(o.g,{id:"rate-star",icon:n.yy}),(0,d.jsx)("p",{children:s.vote_average?s.vote_average.toFixed(1):"N/A"})]})]})]},`movie-${s.id}`))),null===(e=k.shows)||void 0===e?void 0:e.map(((s,e)=>(0,d.jsxs)("div",{className:"film-card",draggable:v,onDragStart:()=>C(e),onDragOver:_,onDrop:()=>P(e,"shows"),onClick:()=>D(s),children:[(0,d.jsx)("img",{src:`https://image.tmdb.org/t/p/w500${s.poster_path}`,alt:s.title||s.name||"Show Image"}),(0,d.jsx)("h3",{children:s.title||s.name}),v&&(0,d.jsx)("button",{onClick:e=>{e.stopPropagation(),r((e=>e.map((e=>e.id===k.id?{...e,shows:e.shows.filter((e=>e.id!==s.id))}:e))))},className:"add-movie",children:"Delete Show"}),(0,d.jsxs)("button",{onClick:e=>{e.stopPropagation(),A(s,e)},className:"add-movie",children:[(0,d.jsx)(o.g,{className:"list-img",icon:n.ITF}),(0,d.jsx)("p",{children:"Add to Playlist"})]}),(0,d.jsxs)("div",{className:"stars",children:[(0,d.jsx)("p",{className:"p1",children:s.first_air_date?s.first_air_date.slice(0,4):"N/A"}),(0,d.jsxs)("div",{className:"p2",children:[(0,d.jsx)(o.g,{id:"rate-star",icon:n.yy}),(0,d.jsx)("p",{children:s.vote_average?s.vote_average.toFixed(1):"N/A"})]})]})]},`show-${s.id}`)))]}),x&&(0,d.jsx)(a.A,{playlists:i,onAdd:s=>{null!==u&&void 0!==u&&u.first_air_date?m(s,u):c(s,u),j(!1)},onClose:()=>j(!1),position:N})]})})}}}]);
//# sourceMappingURL=107.da176cbf.chunk.js.map