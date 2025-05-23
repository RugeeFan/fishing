// core/EntityManager.js

let nextEntityId = 1;

const components = {};

function createEntity() {
  return nextEntityId++;
}

function addComponent(entityId, type, data) {
  if (!components[type]) components[type] = {};
  components[type][entityId] = data;
}

function getComponent(type) {
  return components[type] || {};
}

function getEntitiesWith(...types) {
  const base = Object.keys(getComponent(types[0]));
  return base.filter(id =>
    types.every(type => components[type] && components[type][id])
  );
}

function removeEntity(id) {
  for (const type in components) {
    delete components[type][id];
  }
}
function reset() {
  for (const type in components) {
    components[type] = {};
  }
  nextEntityId = 1;
}

module.exports = {
  createEntity,
  addComponent,
  getComponent,
  getEntitiesWith,
  removeEntity,
  reset, 
  components,
};
