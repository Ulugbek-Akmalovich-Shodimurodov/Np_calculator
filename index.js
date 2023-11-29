
let nP_btn = document.querySelector('.btn_p');
let PQ_btn = document.querySelector('.btn_p_q');


nP_btn.addEventListener('click', (e)=>{
    e.preventDefault();

    let mod_p = document.querySelector('.mod_p').value * 1;
    let a = document.querySelector('.a').value * 1;
    let b = document.querySelector('.b').value * 1;
    let point_p_x = document.querySelector('.point_P_x').value * 1;
    let point_p_y = document.querySelector('.point_P_y').value * 1;
    let point_q_x = document.querySelector('.point_Q_x').value * 1;
    let point_q_y = document.querySelector('.point_Q_y').value * 1;
    let n = document.querySelector('.n').value * 1;
    let result_x = document.querySelector('.result_x');
    let result_y = document.querySelector('.result_y');

    let arrX = [point_p_x]
    let arrY = [point_p_y]
    let arrP = [0]
    let arrnP = [1]
    let k = 0;
    
    
    // darajaga ajratish
    function powersOf2Representation(number) {
        if (number === 0) {
          return [0];
        }
      
        let powers = [];
        let power = 1;
      
        while (Math.pow(2, power) <= number) {
          power++;
        }
      
        power--;
      
        powers.push(Math.pow(2, power));
      
        let remaining = number - Math.pow(2, power);
        powers = powers.concat(powersOf2Representation(remaining));
      
        return powers;
      }
      let arr2 = powersOf2Representation(n);

      for (let i = 2; i <= arr2[0]; i = 2*i) {

            let e = 2*arrY[k];
            let r = (3 * Math.pow(arrX[k], 2) + a)%mod_p;

            let d = function (e, r){
              for(let d = 0; d <= mod_p; d++) {
                if ((e * d) % mod_p == r) 
                  return d;
              }
            }
        arrnP.push(i)
        arrP.push(d(e, r) % mod_p);
        arrX.push((Math.pow(arrP[k+1], 2) - 2*arrX[k]) < 0 ? (Math.pow(arrP[k+1], 2) - 2*arrX[k])%mod_p + mod_p : (Math.pow(arrP[k+1], 2) - 2*arrX[k])%mod_p);
        arrY.push((arrP[k+1] * (arrX[k] - arrX[k+1]) - arrY[k])%mod_p < 0 ? (arrP[k+1] * (arrX[k] - arrX[k+1]) - arrY[k])%mod_p + mod_p : (arrP[k+1] * (arrX[k] - arrX[k+1]) - arrY[k])%mod_p); 
        
        ++k;
      }

      if(arr2.length === 2){
        let index = arrnP.indexOf(arr2[0]);

        result_x.value = `X= ${arrX[index]}`;
        result_y.value = `Y= ${arrY[index]}`;

      }
      else{
        let arrnRes = []
        let arrnResX = []
        let arrnResY = []

        arrnRes.push(arrP[arrP.length-1])
        arrnResX.push(arrX[arrX.length-1])
        arrnResY.push(arrY[arrY.length-1])

        for(let i = 1 ; i<arr2.length-1; i++){
          let index = arrnP.indexOf(arr2[i])

          let e = ((arrX[index] - arrnResX[i-1])%mod_p + mod_p)%mod_p;
          let r = ((arrY[index] - arrnResY[i-1])%mod_p + mod_p)%mod_p;

          let d = function (e, r){
            for(let d = 0; d <= mod_p; d++) {
              if ((e * d) % mod_p == r) 
                return d;
            }
          }

          arrnRes.push(d(e, r));

          arrnResX.push(((Math.pow(arrnRes[arrnRes.length-1], 2) - arrnResX[i-1] - arrX[index])%mod_p + mod_p)%mod_p);
          arrnResY.push(((arrnRes[arrnRes.length-1] * (arrnResX[i-1] - arrnResX[arrnResX.length-1]) - arrnResY[i-1])%mod_p + mod_p)%mod_p)

        }

        result_x.value = `X= ${arrnResX[arrnResX.length-1]}`;
        result_y.value = `Y= ${arrnResY[arrnResY.length-1]}`;
      }

    })   
    
    PQ_btn.addEventListener('click', (ev)=>{
      ev.preventDefault();

      let mod_p = document.querySelector('.mod_p').value * 1;
      let a = document.querySelector('.a').value * 1;
      let b = document.querySelector('.b').value * 1;
      let point_p_x = document.querySelector('.point_P_x').value * 1;
      let point_p_y = document.querySelector('.point_P_y').value * 1;
      let point_q_x = document.querySelector('.point_Q_x').value * 1;
      let point_q_y = document.querySelector('.point_Q_y').value * 1;
      let n = document.querySelector('.n').value * 1;
      let result_x = document.querySelector('.result_x');
      let result_y = document.querySelector('.result_y');


      let e = ((point_q_x - point_p_x)%mod_p + mod_p)%mod_p;
      let r = ((point_q_y - point_p_y)%mod_p + mod_p)%mod_p;

      let d = function (e, r){
        for(let d = 0; d <= mod_p; d++) {
          if ((e * d) % mod_p == r) 
            return d;
          }
      }

      let lyamda = d(e, r);
      let x = ((Math.pow(lyamda, 2) - point_p_x - point_q_x)%mod_p + mod_p)%mod_p;

      result_x.value = `X= ${x}`;
      result_y.value = `Y= ${((lyamda*(point_p_x - x)-point_p_y)%mod_p + mod_p)%mod_p}`;

      

    })