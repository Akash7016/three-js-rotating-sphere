import * as THREE from 'three';
import './index.css'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from 'gsap';

const scene = new THREE.Scene();

//create sphere
const geometry = new THREE.SphereGeometry(3,64,64)

//create material
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness:0.1
});

//create a shape with geometry and material
const mesh = new THREE.Mesh(geometry,material)
scene.add(mesh)

//size
const size = {
  width : window.innerWidth,
  height : window.innerHeight
}

//light
const light = new THREE.PointLight(0xffffff,100);
light.position.set(0,10,10);
scene.add(light)


//camera
const camera = new THREE.PerspectiveCamera(45,size.width/size.height)
camera.position.z = 20

scene.add(camera)

const canvas = document.querySelector(".webgl")
const renderer = new THREE.WebGLRenderer({canvas})
renderer.setSize(size.width,size.height);

renderer.render(scene,camera)

//control
const control = new OrbitControls(camera,canvas)
control.enableDamping = true
control.enablePan=false
control.enableZoom=false
control.autoRotate=true
control.autoRotateSpeed=5

//update sizes
window.addEventListener('resize', ()=> {
  //update window size
  size.width = window.innerWidth
  size.height = window.innerHeight

  //update camera and renderer
  camera.aspect = size.width / size.height
  camera.updateProjectionMatrix()
  renderer.setSize(size.width,size.height);
})

const loop = () => {
  control.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()


//animate with gsap
const tl = gsap.timeline({defaults:{duration:1}})
tl.fromTo(mesh.scale,{x:0,y:0,z:0},{x:1,y:1,z:1})
tl.fromTo('nav',{y:"-100%"},{y:"0%"})
tl.fromTo('.title',{opacity:'0'},{opacity:'1'})

let mouseDown = false;
let rgb = []

window.addEventListener('mouseup',()=>(mouseDown = false))
window.addEventListener('mousedown',()=>(mouseDown = true))

window.addEventListener('mousemove',(e)=>{
  if(mouseDown){
    rgb=[Math.round((e.pageX/size.width)*255),Math.round((e.pageY/size.height)*255),150]
    let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
    gsap.to(mesh.material.color,{
      r:newColor.r,
      g:newColor.g,
      b:newColor.b  
    })
  }
})