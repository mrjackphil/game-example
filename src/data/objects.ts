const objects: { [key: string]: EnviromentObject } = {
  "floor": {
    name: 'Floor',
    render: '.',
    zIndex: 0,
  },
  "wall": {
    name: 'Ground',
    render: '#',
    zIndex: 0,
  }
}

export default objects;