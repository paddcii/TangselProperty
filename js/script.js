const $=s=>document.querySelector(s),WA='6281234567890';
// [tipe, nama, kawasan, harga, kamar tidur, kamar mandi, luas tanah, luas bangunan, gambar, nilai dalam juta (per tahun untuk sewa)]
const D=[
['Dijual','Cluster Emerald Residence','BSD City','Rp 2,45 M',3,2,120,100,'p1',2450],
['Dijual','Rumah Modern Tropis','Bintaro Jaya','Rp 4,2 M',4,3,200,180,'p2',4200],
['Dijual','Town House 2 Lantai','Serpong','Rp 1,35 M',3,2,90,85,'p3',1350],
['Dijual','Rumah Minimalis Kekinian','Pamulang','Rp 685 juta',2,1,72,45,'p4',685],
['Dijual','Signature Villa','BSD City','Rp 9,8 M',5,4,400,380,'p5',9800],
['Disewa','Rumah Siap Huni','Pondok Aren','Rp 48 juta/tahun',3,2,100,80,'p6',48],
['Disewa','Rumah Cluster Furnished','BSD City','Rp 9 juta/bulan',3,2,110,90,'p7',108],
['Disewa','Rumah 2 Lantai','Ciputat','Rp 35 juta/tahun',3,2,84,75,'p8',35],
['Disewa','Rumah Taman Luas','Bintaro Jaya','Rp 85 juta/tahun',4,3,180,150,'p9',85]];
const areas=['BSD City','Bintaro Jaya','Serpong','Pondok Aren','Ciputat','Pamulang'];
const fa=$('#fa'),fb=$('#fb'),fk=$('#fk'),so=$('#so'),grid=$('#grid');let tp='Semua';
// [label, minimum, maksimum] dalam juta rupiah
const B={Dijual:[['Semua anggaran',0,1e9],['Di bawah Rp 1 M',0,1000],['Rp 1 M – 3 M',1000,3000],['Rp 3 M – 5 M',3000,5000],['Di atas Rp 5 M',5000,1e9]],
Disewa:[['Semua anggaran',0,1e9],['Di bawah Rp 40 juta/tahun',0,40],['Rp 40 – 80 juta/tahun',40,80],['Di atas Rp 80 juta/tahun',80,1e9]]};
function setBudget(){const o=B[tp]||[];fb.innerHTML='';fb.disabled=!o.length;
  if(!o.length)fb.add(new Option('Pilih Dijual atau Disewa',0));
  o.forEach((b,i)=>fb.add(new Option(b[0],i)))}
areas.forEach(a=>{fa.add(new Option(a));$('#ck').add(new Option(a))});

function draw(){
  const b=B[tp]&&B[tp][+fb.value];
  const L=D.filter(d=>(tp=='Semua'||d[0]==tp)&&(fa.value=='Semua'||d[2]==fa.value)&&d[4]>=+fk.value&&(!b||(d[9]>=b[1]&&d[9]<b[2])));
  if(so.value)L.sort((x,y)=>x[0]==y[0]?(so.value=='asc'?x[9]-y[9]:y[9]-x[9]):x[0]<y[0]?-1:1);
  $('#cnt').textContent=L.length+' properti'+(tp!='Semua'?' '+tp.toLowerCase():'')+(fa.value!='Semua'?' di '+fa.value:'');
  grid.innerHTML=L.map(d=>`<article class="cd"><div class="im"><img src="assets/img/${d[8]}.jpg" alt="${d[1]}, ${d[2]}" loading="lazy"><span class="bd ${d[0]=='Disewa'?'r':''}">${d[0]}</span></div>
<div class="cb"><h3>${d[1]}</h3><span class="ar">${d[2]}, Tangerang Selatan</span>
<div class="sp"><span>${d[4]} KT</span><span>${d[5]} KM</span><span>LT ${d[6]} m²</span><span>LB ${d[7]} m²</span></div>
<div class="pr"><b>${d[3]}</b><a href="https://wa.me/${WA}?text=${encodeURIComponent('Halo, saya tertarik dengan '+d[1]+' di '+d[2]+' ('+d[3]+')')}" target="_blank" rel="noopener">Tanya unit ini</a></div></div></article>`).join('')
  ||'<p class="em">Tidak ada properti yang cocok. Coba ubah anggaran atau jumlah kamar, atau hubungi kami karena unit baru masuk setiap minggu.</p>';
}
const seg=()=>document.querySelectorAll('.sg button').forEach(x=>x.setAttribute('aria-pressed',x.dataset.t==tp));
setBudget();draw();
$('#sf').onsubmit=e=>{e.preventDefault();draw();$('#properti').scrollIntoView()};
document.querySelectorAll('.sg button').forEach(x=>x.onclick=()=>{tp=x.dataset.t;seg();setBudget();draw()});
[fa,fb,fk,so].forEach(el=>el.onchange=draw);
$('#rs').onclick=()=>{tp='Semua';fa.value='Semua';fk.value=0;so.value='';seg();setBudget();draw()};

// Menu dan header
const nav=$('#nav'),mb=$('#mb');
mb.onclick=()=>mb.setAttribute('aria-expanded',nav.classList.toggle('o'));
nav.onclick=e=>{if(e.target.tagName=='A'){nav.classList.remove('o');mb.setAttribute('aria-expanded',false)}};
const hd=$('header'),onS=()=>hd.classList.toggle('s',scrollY>40);onS();addEventListener('scroll',onS,{passive:true});

// Hitung naik pada statistik
const io=new IntersectionObserver(es=>es.forEach(e=>{
  if(!e.isIntersecting)return;io.unobserve(e.target);
  const el=e.target,n=+el.dataset.n,s=el.dataset.s||'',t0=performance.now();
  (function f(t){const k=Math.min((t-t0)/1400,1);el.textContent=Math.round(n*(1-Math.pow(1-k,3)))+s;if(k<1)requestAnimationFrame(f)})(t0);
}),{threshold:.6});
document.querySelectorAll('[data-n]').forEach(el=>io.observe(el));

// Formulir kontak ke WhatsApp
$('#cf').onsubmit=e=>{e.preventDefault();const f=e.target;
  const t=`Halo Griya Tangsel, saya ${f.n.value}. Minat: ${f.m.value} di ${f.k.value}. ${f.p.value}`;
  open(`https://wa.me/${WA}?text=${encodeURIComponent(t)}`,'_blank')};