<template>
  <div class="parent">
    <b-button variant="primary" to="/">Go Back Home</b-button>
    <div id="image">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="css" scoped>
#image {
  background-image: url("https://i.pinimg.com/originals/00/2d/57/002d5714c44f88a16c1f0bdfa97ca05e.jpg");
  background-size: contain;
  background-repeat: no-repeat;
  height: 500px;
  padding: 20px;
  margin-top: 20px;
  width: clamp(23ch, 80%, 800px);
  display: flex;
  flex-direction: column;
}
.parent {
  display: grid;
  place-items: center;
}
#image p,h1 {
  text-align: left;
  background-color: rgb(0, 0, 0);
  color: white;
  width: fit-content;
}
</style>
