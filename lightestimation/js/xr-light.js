

AFRAME.registerSystem('xr-light', {
        init: function() {
          const startListen = () => {
            window.XR.XrController.configure({enableLighting: true})
            window.XR.addCameraPipelineModule({
              name: 'xr-light',
              onUpdate: ({processCpuResult}) => {
                if (processCpuResult.reality && processCpuResult.reality.lighting && processCpuResult.reality.lighting.exposure) {
                  this.intensity = 1 + processCpuResult.reality.lighting.exposure
                }
              }
            })
          }

          this.intensity = 1

          window.XR ? startListen() : window.addEventListener('xrloaded', startListen)

          }
        })

      AFRAME.registerComponent('xr-light', {
        schema: {
          min: {default: 0},
          max: {default: 2}
        },
        tick: function() {
          let headlights = this.el.sceneEl.querySelectorAll('a-cone')
          
          this.el.setAttribute('light', `intensity: ${Math.max(this.data.min, Math.min(this.system.intensity, this.data.max))}`)
          
          if(this.system.intensity < 0.8) {
              headlights[0].object3D.visible = true
              headlights[1].object3D.visible = true
              console.log('headights on')      
            
              console.log('DARK')
            } else {
              headlights[0].object3D.visible = false
              headlights[1].object3D.visible = false
              console.log('headights off')
              
              console.log('BRIGHT')
            }
                    
          }
        })