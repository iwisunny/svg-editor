/* eslint-disable */

const data = [
  {
    "id": "i-1xa2axv3",
    "type": "instance",
    "label": "主机 1",
    "metadata": {},
    "parent": "KseI6YvxT",
    "children": []
  },
  {
    "id": "v-da2x2a",
    "type": "volume",
    "label": "硬盘 1",
    "metadata": {},
    "parent": "i-1xa2axv3",
    "children": []
  },
  {
    "id": "v-xa234g",
    "type": "volume",
    "label": "硬盘 2",
    "metadata": {},
    "parent": "i-1xa2axv3",
    "children": []
  },
  {
    "id": "KseI6YvxT",
    "type": "vxnet",
    "label": "基础网络 1",
    "metadata": {},
    "parent": 0,
    "children": []
  },
  {
    "id": "MKOokP-E7",
    "type": "instance",
    "label": "主机 2",
    "metadata": {},
    "parent": "KseI6YvxT",
    "children": []
  },
  {
    "id": "TolLZ959y",
    "type": "volume",
    "label": "硬盘 3",
    "metadata": {},
    "parent": "i-1xa2axv3",
    "children": []
  },
  {
    "id": "Bm3t0y8LN",
    "type": "eip",
    "label": "EIP 1",
    "metadata": {},
    "parent": "i-1xa2axv3",
    "children": []
  },
  {
    "id": "Qyn7I5vuP",
    "type": "keypair",
    "label": "ssh key 1",
    "metadata": {},
    "parent": "MKOokP-E7",
    "children": []
  },
  {
    "id": "RcSlj3GTa",
    "type": "keypair",
    "label": "ssh key 2",
    "metadata": {},
    "parent": "MKOokP-E7",
    "children": []
  },
  {
    "id": "jSHngZ_ff",
    "type": "keypair",
    "label": "ssh key 3",
    "metadata": {},
    "parent": "MKOokP-E7",
    "children": []
  },
  {
    "id": "EAb6frJc5",
    "type": "volume",
    "label": "硬盘 4",
    "metadata": {},
    "parent": "MKOokP-E7",
    "children": []
  }
];

const connectionRules = {
  instance: [{ resourceType: 'vxnet-0' }, { resourceType: 'vxnet' }, { resourceType: 'security_group' }, { resourceType: 'loadbalancer_backend', connectionType: 'secondary' }],
  volume: [{ resourceType: 'instance' }],
  router: [{ resourceType: 'vxnet-0' }, { resourceType: 'security_group' }],
  vxnet: [{ resourceType: 'router' }],
  eip: [{ resourceType: 'instance' }, { resourceType: 'router' }, { resourceType: 'loadbalancer' }],
  security_group: [{ resourceType: 'vxnet-0' }, { resourceType: 'instance' }, { resourceType: 'cluster' }],
  loadbalancer: [{ resourceType: 'vxnet-0' }, { resourceType: 'security_group' }, { resourceType: 'vxnet' }],
  keypair: [{ resourceType: 'instance' }],
  cluster: [{ resourceType: 'vxnet-0' }, { resourceType: 'security_group' }, { resourceType: 'vxnet' }],
  loadbalancer_listener: [{ resourceType: 'loadbalancer' }],
  loadbalancer_backend: [{ resourceType: 'loadbalancer_listener' }],
};

const sourceMapper = {
  instance: {
    label: '主机',
    icon: '<rect width="18" height="13" x="3" y="4" fill="currentColor"></rect><path d="M10,17 L14,17 C14,18.1045695 14.8954305,19 16,19 L16,20 L8,20 L8,19 C9.1045695,19 10,18.1045695 10,17 Z"></path>',
    iconType: 'svg',
    color: '#32b8a3',
    anchor: true,
  },
  volume: {
    label: '硬盘',
    icon: '<path d="M4,16 L20,16 L20,20 C20,21.1045695 19.1045695,22 18,22 L6,22 C4.8954305,22 4,21.1045695 4,20 L4,16 Z M6,18 L6,20 L9,20 L9,18 L6,18 Z M10,18 L10,20 L13,20 L13,18 L10,18 Z" fill="currentColor"></path><polygon fill="#b6c2cd" points="6 2 18 2 20 16 4 16"></polygon>',
    iconType: 'svg',
    color: '#32b8a3',
    anchor: false,
  },
  eip: {
    label: 'EIP',
    icon: '<path d="M19.003974,10.3248169 C18.4172891,9.97655987 17.7322413,9.77660131 17.0004908,9.77660131 C16.1639123,9.77660131 15.388376,10.0379541 14.7510764,10.4834655 C14.7392822,9.90450942 14.7084245,9.33942216 14.6595741,8.79303406 L18.7203515,8.79303406 C18.8625378,9.28577426 18.9587286,9.7980185 19.003974,10.3248169 Z M13.3930775,12.1438149 C13.243428,12.4886416 13.1417725,12.8591253 13.0965397,13.2468372 L8.72169451,13.2468372 C8.65191198,12.5404556 8.6133146,11.7933499 8.6133146,11.0199356 C8.6133146,10.2465214 8.65191198,9.49941573 8.72169451,8.79303406 L13.3119969,8.79303406 C13.3817794,9.49941573 13.4203768,10.2465214 13.4203768,11.0199356 C13.4203768,11.4015441 13.4109802,11.7767477 13.3930775,12.1438149 Z M15.0517311,17.9488948 C14.4760654,18.2848419 13.8547521,18.5511026 13.1993569,18.7361114 C13.5583404,18.1205134 13.8632402,17.350327 14.1055205,16.4640632 L15.0517311,17.9488948 Z M3.3133399,8.79303406 L7.37411735,8.79303406 C7.31028446,9.5069989 7.27717365,10.2528919 7.27717365,11.0199356 C7.27717365,11.7869794 7.31028446,12.5328724 7.37411735,13.2468372 L3.3133399,13.2468372 C3.10932088,12.5398185 3,11.7926437 3,11.0199356 C3,10.2472276 3.10932088,9.50005284 3.3133399,8.79303406 Z M3.83332408,7.45689311 C4.82984984,5.45164012 6.64129033,3.92282537 8.83433453,3.30375987 C8.24009992,4.32277501 7.79406022,5.76537825 7.53493177,7.45689311 L3.83332408,7.45689311 Z M18.2003673,7.45689311 L14.4987596,7.45689311 C14.2396312,5.76537825 13.7935915,4.32277501 13.1993569,3.30375987 C15.3924011,3.92282537 17.2038416,5.45164012 18.2003673,7.45689311 Z M8.89763111,7.45689311 C9.33508086,4.82756434 10.2076086,3.028286 11.0168457,3.028286 C11.8260828,3.028286 12.6986105,4.82756434 13.1360603,7.45689311 L8.89763111,7.45689311 Z M3.83332408,14.5829782 L7.53493177,14.5829782 C7.79406022,16.2744931 8.24009992,17.7170963 8.83433453,18.7361114 C6.64129033,18.1170459 4.82984984,16.5882312 3.83332408,14.5829782 Z M8.89763111,14.5829782 L13.1360603,14.5829782 C12.6986105,17.212307 11.8260828,19.0115853 11.0168457,19.0115853 C10.2076086,19.0115853 9.33508086,17.212307 8.89763111,14.5829782 Z"></path><path d="M13.0698629,13.7072292 C13.0698629,11.5364033 14.8296649,9.77660131 17.0004908,9.77660131 C19.1713166,9.77660131 20.9311186,11.5364033 20.9311186,13.7072292 C20.9311186,14.574529 20.6502182,15.3762211 20.1744322,16.0262905 L17.0004908,21.0069666 L13.8265494,16.0262905 C13.3507633,15.3762211 13.0698629,14.574529 13.0698629,13.7072292 Z M16.956048,15.391784 C17.8864019,15.391784 18.6406028,14.6375831 18.6406028,13.7072292 C18.6406028,12.7768752 17.8864019,12.0226744 16.956048,12.0226744 C16.0256941,12.0226744 15.2714932,12.7768752 15.2714932,13.7072292 C15.2714932,14.6375831 16.0256941,15.391784 16.956048,15.391784 Z" fill="currentColor"></path>',
    iconType: 'svg',
    color: '#41a3e1',
    anchor: false,
  },
  vxnet: {
    label: '网络',
    icon: '<path d="M19.1576184,10.3674325 C17.1593438,8.88015738 14.6824578,8 12,8 C9.31392032,8 6.83396792,8.88253578 4.83428989,10.3734602 L2.44844342,7.1622944 C5.11414164,5.17579917 8.41956558,4 11.9996121,4 C15.5776145,4 18.8813079,5.17445684 21.546214,7.15889245 L19.1576184,10.3674325 Z"></path><path d="M4.83428989,10.3734602 C6.83396792,8.88253578 9.31392032,8 12,8 C14.6824578,8 17.1593438,8.88015738 19.1576184,10.3674325 L11.9866598,20 L4.83428989,10.3734602 Z" fill="currentColor"></path>',
    iconType: 'svg',
    color: '#41a3e1',
    anchor: true,
  },
  keypair: {
    label: 'ssh key',
    icon: '<path d="M13.8985897,12.9675015 L12.8482486,14.7867456 C11.231971,14.8773458 9.99516508,16.2610437 10.0857653,17.8773213 C10.1071709,18.2591914 10.2031058,18.6331808 10.3681607,18.9782024 L10.3954162,19.035176 L9.39956719,20.7600371 L6.47858468,21.542712 L5.69590977,18.6217295 L10.1949323,10.8291939 C10.6189693,11.4043732 11.1659316,11.9034283 11.8243537,12.2835685 C12.4827758,12.6637086 13.1884513,12.8878644 13.8985897,12.9675015 Z"/><path d="M11.8243537,12.2835685 C9.26751181,10.8073751 8.39147308,7.5379541 9.86766643,4.98111221 C11.3438598,2.42427032 14.6132808,1.54823159 17.1701227,3.02442495 C19.7269646,4.5006183 20.6030033,7.77003934 19.12681,10.3268812 C17.6506166,12.8837231 14.3811956,13.7597618 11.8243537,12.2835685 Z M13.5349737,9.32068777 C14.4554617,9.85213179 15.6324852,9.53674929 16.1639293,8.61626124 C16.6953733,7.69577319 16.3799908,6.51874969 15.4595027,5.98730567 C14.5390147,5.45586165 13.3619912,5.77124414 12.8305472,6.69173219 C12.2991031,7.61222024 12.6144856,8.78924374 13.5349737,9.32068777 Z" fill="currentColor"/>',
    iconType: 'svg',
    color: '#32b8a3',
    anchor: false,
  },
  router: {
    label: '路由器',
    icon: 'static/router.svg',
    color: '#41a3e1',
    anchor: true,
  },
  loadbalancer: {
    label: '负载均衡器',
    icon: 'static/router.svg',
    color: '#41a3e1',
    anchor: true,
  },
  loadbalancer_listener: {
    label: '负载均衡器监听器',
    icon: 'static/router.svg',
    color: '#41a3e1',
    anchor: true,
  },
  loadbalancer_backend: {
    label: '负载均衡器后端',
    icon: 'static/router.svg',
    connectionType: 'secondary',
    color: '#41a3e1',
    anchor: false,
  }
};

export {
  data,
  connectionRules,
  sourceMapper,
} ;

/* eslint-disable */
