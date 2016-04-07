var scene, camera, controls, clock, renderer, uniforms, shaderMaterial, mesh, testMeshes;

window.addEventListener( 'resize', onWindowResize, false );
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
};



function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);

  controls = new THREE.OrbitControls( camera );

  clock = new THREE.Clock();
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  camera.position.set(0, 0, 300);
  camera.lookAt(scene.position);

  uniforms = {
      time: {
          type: "f",
          value: 1.0
      },
      resolution: {
          type: "v2",
          value: new THREE.Vector2()
      }
  };

  shaderMaterial = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: document.getElementById('vertexShader').textContent,
      fragmentShader: document.getElementById('fragmentShader').textContent
  });

          
  testMeshes = [];
  testMeshes.push(
    new THREE.Mesh(new THREE.PlaneGeometry( 60, 60, 64, 64 ),shaderMaterial)
  );
  testMeshes.push(
    new THREE.Mesh(new THREE.BoxGeometry( 60, 60, 60, 64, 64, 64 ),shaderMaterial)
  );
  testMeshes.push(
    new THREE.Mesh(new THREE.SphereGeometry( 30, 64, 64 ),shaderMaterial)
  );
  testMeshes.push(
    new THREE.Mesh(new THREE.CylinderGeometry( 30, 30, 64, 64 ),shaderMaterial)
  );
  testMeshes.push(
    new THREE.Mesh(new THREE.TorusGeometry( 30, 15, 64, 64, Math.PI * 2),shaderMaterial)
  );
  testMeshes.push(
    new THREE.Mesh(new THREE.TorusKnotGeometry( 30, 10, 64, 64 ),shaderMaterial)
  );
  testMeshes.push(
    new THREE.Mesh(new THREE.IcosahedronGeometry( 30, 0 ),shaderMaterial)
  );
  testMeshes.push(
    new THREE.Mesh(new THREE.DodecahedronGeometry( 30, 0 ),shaderMaterial)
  );
  testMeshes.push(
    new THREE.Mesh(new THREE.TetrahedronGeometry( 40, 0 ),shaderMaterial)
  );
  
  testMeshes[0].material.side = THREE.DoubleSide;
  for (var i = 0; i < 9; i++) {
    scene.add(testMeshes[i]);
    if (i < 3) {
      testMeshes[i].position.y += 100;
    }
    if (i >= 6) {
      testMeshes[i].position.y -= 100; 
    }
    if (i%3 == 0) {
      testMeshes[i].position.x -= 100;
    }
    if (i % 3 == 2) {
      testMeshes[i].position.x += 100;
    }
  }
  
}

function render() {
    var delta = clock.getDelta();
    uniforms.time.value += delta * 2;

    for (var i = 0; i < testMeshes.length; i++) {
      testMeshes[i].rotation.x += 0.01;
      testMeshes[i].rotation.y += 0.01;
    }

    controls.update();
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

window.onload = function() {
  init();
  render();
}

javascript:(function() {
  var script=document.createElement('script');
  script.onload=function() {
    var stats=new Stats();
    stats.domElement.style.cssText='position:fixed;left:0;top:0;z-index:10000';
    document.body.appendChild(stats.domElement);
    requestAnimationFrame(function loop(){
      stats.update();
      requestAnimationFrame(loop)
    });
  };
  script.src='//rawgit.com/mrdoob/stats.js/master/build/stats.min.js'
  ;document.head.appendChild(script);
})()
