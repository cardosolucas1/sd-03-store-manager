function verifyId(id) {
  if (!id || id.length !== 24) {
    return { error: true, message: 'Wrong sale ID format' };
  }
  return true;
}

function handleExistence(resource, shouldExists) {
  if (!resource && shouldExists === 'should exists') {
    return { error: true, message: 'Product doesn\'t exists' };
  }
  if (resource && shouldExists === 'should not exists') {
    return { error: true, message: 'Product already exists' };
  }
  return resource;
}

module.exports = {
  verifyId,
  handleExistence,
};
