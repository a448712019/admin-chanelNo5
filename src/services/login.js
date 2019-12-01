import request from '@/utils/request';
export async function login(params) {
  let formDate = new FormData();
  // let data = {}
  // formDate.append('name', params.name)
  // formDate.append('password', params.password)
  // console.log(params)
  return request('entry=sys&c=login&a=login', {
      method: 'POST',
      body: params,
      isForm: true
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function register(params) {
  return request('entry=sys&c=register&a=register', {
    method: 'POST',
    body: params,
    isForm: true
  })
}
