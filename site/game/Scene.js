const {
  Color3,
  Vector3,
  HemisphericLight,
  DirectionalLight,
  ShadowGenerator,
  FollowCamera,
  WebXRState,
} = BABYLON;

export class Environment {
  constructor(scene) {
    this.scene = scene;

    // TODO Separate ground for VR player and character / tiles
    this.helper = scene.createDefaultEnvironment({
      createGround: false,
      skyboxSize: 100,
    });
  }

  setTheme(theme) {
    let mainColor;

    if (theme === "dark") {
      mainColor = new Color3(0.01, 0.1, 0.2);
    } else if (theme === "awaken") {
      mainColor = new Color3(0.1, 0.3, 0.4);
    }

    this.scene.clearColor = mainColor;
    this.scene.ambientColor = mainColor;
    this.helper.setMainColor(mainColor);
  }
}

export function AmbientLight(scene) {
  // TODO Diffuse and specular colors
  const ambient = new HemisphericLight(
    "ambientLight",
    new Vector3(0, 1, 0),
    scene
  );
  ambient.intensity = 0.5;
  return ambient;
}

export function DirectLight(scene) {
  const direct = new DirectionalLight(
    "directLight",
    new Vector3(0, -3, 1),
    scene
  );
  direct.intensity = 0.8;
  direct.position.y = 3;
  return direct;
}

export function ShadowGen(scene, direct) {
  const shadowGenerator = new ShadowGenerator(96, direct);
  shadowGenerator.usePoissonSampling = true;
  shadowGenerator.darkness = 0.5;
  return shadowGenerator;
}

export function IsoCam(scene) {
  const isoCam = new FollowCamera("isoCam", new Vector3(-10, 10, -10), scene);
  isoCam.rotation = new Vector3(Math.PI / 6, Math.PI / 4, 0);
  return isoCam;
}

export async function initXRHelper(scene, isoCam) {
  if (window.navigator.xr) {
    const defaultCam = new FollowCamera(
      "defaultCam",
      new Vector3(0, 10, -10),
      scene
    );
    defaultCam.rotation = new Vector3(Math.PI / 6, 0, 0);

    return scene
      .createDefaultXRExperienceAsync({
        // By default, XR wrecks havoc with the camera setup.
        // 1. Upon entering, xrCam inherits both the position and direction
        //    of the active camera, which is wrong and hard to reset.
        // 2. Upon exiting, the active cam's position is set to that of xrCam.
        //    Which breaks our isomorphic POV.
        //
        // This option prevents #2
        ignoreNativeCameraTransformation: true,
        disableTeleportation: true,
        useMultiview: true,
      })
      .then((xr) => {
        const xrHelper = xr.baseExperience;
        xrHelper.onStateChangedObservable.add((state) => {
          if (state === WebXRState.IN_XR) {
            // ... While this line prevents #1
            xrHelper.camera.setTransformationFromNonVRCamera(defaultCam);
          }
        });
        return xrHelper;
      });
  } else {
    console.log("No WebXR support");
  }
}