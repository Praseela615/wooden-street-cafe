const menuItems = [
 {name:"Classic Cappuccino",category:"coffee",desc:"Espresso, steamed milk & soft foam.",price:160,img:"https://images.unsplash.com/photo-1572449043416-55f4685c9bb7?auto=format&fit=crop&w=900&q=80"},
 {name:"Café Latte",category:"coffee",desc:"Smooth espresso with creamy steamed milk.",price:180,img:"https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=900&q=80"},
{
  name:"Wooden Street Pizza",
  category:"food",
  desc:"Crispy crust topped with fresh vegetables, cheese & herbs.",
  price:280,
  img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=80"
},
 {name:"Cold Brew",category:"coffee",desc:"Slow-brewed, naturally smooth and refreshing.",price:190,img:"https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80"},
 {name:"Grilled Veg Sandwich",category:"food",desc:"Toasted sourdough, vegetables and house sauce.",price:180,img:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80"},
 {name:"Paneer Wrap",category:"food",desc:"Spiced paneer, crisp greens and creamy dressing.",price:210,img:"https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=80"},
 {name:"Mushroom Toast",category:"food",desc:"Sourdough with herbed mushrooms and herbs.",price:220,img:"https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80"},
 {name:"Chocolate Brownie",category:"dessert",desc:"Warm fudgy brownie with dark chocolate.",price:150,img:"https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80"},
 {name:"New York Cheesecake",category:"dessert",desc:"Creamy classic cheesecake with berry compote.",price:220,img:"https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=80"},
 {name:"Berry Cooler",category:"beverage",desc:"Fresh berries, citrus and sparkling water.",price:170,img:"https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80"},
 {name:"Fresh Lemonade",category:"beverage",desc:"Bright lemon, mint and a touch of sweetness.",price:130,img:"https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80"},
 {name:"Chocolate Waffle",category:"special",desc:"Crisp waffle, chocolate drizzle and berries.",price:190,img:"https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=900&q=80"}
];

const menuGrid=document.getElementById("menuGrid"), noResults=document.getElementById("noResults"), menuSearch=document.getElementById("menuSearch");
let activeCategory="all";
function renderMenu(){
  const q=menuSearch.value.toLowerCase().trim();
  const filtered=menuItems.filter(i=>(activeCategory==="all"||i.category===activeCategory)&&(`${i.name} ${i.desc}`).toLowerCase().includes(q));
  menuGrid.innerHTML=filtered.map(i=>`
    <article class="menu-card">
      <img src="${i.img}" alt="${i.name}" loading="lazy">
      <div class="menu-body"><div class="menu-top"><h3>${i.name}</h3><span class="price">₹${i.price}</span></div>
      <p>${i.desc}</p><button class="add-btn" data-id="${menuItems.indexOf(i)}">+ Add to Order</button></div>
    </article>`).join("");
  noResults.classList.toggle("hidden",filtered.length>0);
}
renderMenu();
document.querySelectorAll(".tab").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".tab").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeCategory=b.dataset.category;renderMenu()}));
menuSearch.addEventListener("input",renderMenu);

let cart=JSON.parse(localStorage.getItem("woodenCart")||"[]");
const cartDrawer=document.getElementById("cartDrawer");
function saveCart(){localStorage.setItem("woodenCart",JSON.stringify(cart));renderCart()}
function addToCart(item){const found=cart.find(x=>x.name===item.name);if(found)found.qty++;else cart.push({...item,qty:1});saveCart();showToast(`${item.name} added to your order`)}
function renderCart(){
 document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);
 const box=document.getElementById("cartItems");
 box.innerHTML=cart.length?cart.map((x,i)=>`<div class="cart-line"><div><strong>${x.name}</strong><small>₹${x.price} × ${x.qty}</small></div><div><button class="add-btn" data-cart-minus="${i}">−</button> <button class="add-btn" data-cart-plus="${i}">+</button></div></div>`).join(""):"<p style='color:var(--muted)'>Your order is empty. Add something delicious!</p>";
 document.getElementById("cartTotal").textContent="₹"+cart.reduce((s,x)=>s+x.price*x.qty,0);
}
document.addEventListener("click",e=>{
 const add=e.target.closest(".add-btn"); if(add&&!add.dataset.cartMinus&&!add.dataset.cartPlus){addToCart(menuItems[+add.dataset.id]);}
 if(e.target.dataset.cartPlus){cart[+e.target.dataset.cartPlus].qty++;saveCart()}
 if(e.target.dataset.cartMinus){const i=+e.target.dataset.cartMinus;cart[i].qty--;if(cart[i].qty<=0)cart.splice(i,1);saveCart()}
});
document.querySelector(".add-signature").addEventListener("click",()=>addToCart(menuItems[2]));
document.getElementById("cartFab").onclick=()=>cartDrawer.classList.add("open");
document.getElementById("closeCart").onclick=()=>cartDrawer.classList.remove("open");
document.getElementById("checkoutBtn").onclick=()=>{if(!cart.length)return showToast("Add an item before proceeding");showToast("Order received for demo — thank you!");cart=[];saveCart();cartDrawer.classList.remove("open")};
renderCart();

const navToggle=document.getElementById("navToggle"),navLinks=document.getElementById("navLinks");
navToggle.onclick=()=>navLinks.classList.toggle("open");
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const themeToggle=document.getElementById("themeToggle");
if(localStorage.getItem("woodenTheme")==="dark")document.body.classList.add("dark");
function updateThemeIcon(){themeToggle.textContent=document.body.classList.contains("dark")?"☀":"☾"}
themeToggle.onclick=()=>{document.body.classList.toggle("dark");localStorage.setItem("woodenTheme",document.body.classList.contains("dark")?"dark":"light");updateThemeIcon()};updateThemeIcon();

const reserveDate=document.getElementById("reserveDate"); reserveDate.min=new Date().toISOString().split("T")[0];
document.getElementById("reservationForm").addEventListener("submit",e=>{
 e.preventDefault(); if(!e.target.checkValidity()){e.target.reportValidity();return}
 document.getElementById("reservationSuccess").textContent="✓ Reservation request received! We look forward to welcoming you.";
 e.target.reset(); reserveDate.min=new Date().toISOString().split("T")[0];
});
const reviews=[
 ["“The perfect place to work, read and enjoy really good coffee.”","Ananya R."],
 ["“The plants, books and warm lighting make this café feel completely different.”","Rahul M."],
 ["“One of my favorite places to spend a slow Sunday afternoon.”","Meera K."]
];let reviewIndex=0;
function showReview(){const r=reviews[reviewIndex];document.getElementById("reviewCard").innerHTML=`<div class="review-stars">★★★★★</div><p class="review-quote">${r[0]}</p><div class="review-author">— ${r[1]}</div>`}
document.getElementById("prevReview").onclick=()=>{reviewIndex=(reviewIndex+reviews.length-1)%reviews.length;showReview()};
document.getElementById("nextReview").onclick=()=>{reviewIndex=(reviewIndex+1)%reviews.length;showReview()};showReview();

const wallMessages=JSON.parse(localStorage.getItem("woodenWall")||"[]");
function renderWall(){document.getElementById("wallMessages").innerHTML=wallMessages.map(x=>`<div class="wall-note"><p>“${escapeHtml(x.message)}”</p><small>— ${escapeHtml(x.name)}</small></div>`).join("")}
function escapeHtml(s){return s.replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
document.getElementById("wallForm").addEventListener("submit",e=>{e.preventDefault();const message=document.getElementById("wallMessage").value.trim(),name=document.getElementById("wallName").value.trim();if(!message||!name)return;wallMessages.unshift({message,name});wallMessages.splice(8);localStorage.setItem("woodenWall",JSON.stringify(wallMessages));renderWall();e.target.reset();showToast("Your message is now on the community wall ✨")});renderWall();

document.querySelectorAll(".gallery-filters button").forEach(b=>b.onclick=()=>{document.querySelectorAll(".gallery-filters button").forEach(x=>x.classList.remove("active"));b.classList.add("active");const f=b.dataset.filter;document.querySelectorAll(".gallery-item").forEach(i=>i.style.display=f==="all"||i.dataset.type===f?"block":"none")});
const lightbox=document.getElementById("lightbox"),lightboxImg=document.getElementById("lightboxImg");
document.querySelectorAll(".gallery-item").forEach(i=>i.onclick=()=>{lightboxImg.src=i.dataset.src;lightbox.classList.remove("hidden")});
document.getElementById("closeLightbox").onclick=()=>lightbox.classList.add("hidden");lightbox.onclick=e=>{if(e.target===lightbox)lightbox.classList.add("hidden")};

function showToast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2600)}
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();e.target.reset();showToast("Thanks! You're on the Wooden Street list.")});




function openAuthModal() {

    document
        .getElementById("authModal")
        .classList.add("active");

}


function closeAuthModal() {

    document
        .getElementById("authModal")
        .classList.remove("active");

}




function showSignup() {

    document
        .getElementById("loginSection")
        .style.display = "none";

    document
        .getElementById("signupSection")
        .style.display = "block";

}




function showLogin() {

    document
        .getElementById("signupSection")
        .style.display = "none";

    document
        .getElementById("loginSection")
        .style.display = "block";

}




document
    .getElementById("signupForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const name =
            document
                .getElementById("signupName")
                .value
                .trim();


        const email =
            document
                .getElementById("signupEmail")
                .value
                .trim();


        const password =
            document
                .getElementById("signupPassword")
                .value;


        const confirmPassword =
            document
                .getElementById("signupConfirmPassword")
                .value;


     

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }


        

        const user = {

            name: name,

            email: email,

            password: password

        };


        

        localStorage.setItem(
            "woodenStreetUser",
            JSON.stringify(user)
        );


        alert(
            "Account created successfully! ☕"
        );


       

        document
            .getElementById("signupForm")
            .reset();


       

        showLogin();

    });



document
    .getElementById("loginForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();


        const email =
            document
                .getElementById("loginEmail")
                .value
                .trim();


        const password =
            document
                .getElementById("loginPassword")
                .value;


       

        const savedUser =
            JSON.parse(
                localStorage.getItem(
                    "woodenStreetUser"
                )
            );


      

        if (!savedUser) {

            alert(
                "No account found. Please Sign Up first."
            );

            return;

        }


        

        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {


            localStorage.setItem(
                "woodenStreetLoggedIn",
                "true"
            );


            alert(
                "Welcome back, " +
                savedUser.name +
                "! ☕"
            );


            closeAuthModal();


            document
                .getElementById("loginForm")
                .reset();


        } else {


            alert(
                "Incorrect email or password."
            );

        }

    });
