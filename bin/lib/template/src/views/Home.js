
const Home = () => {
  const name = 'home-view'
  const template = () => {
    return (
      <div class="home">
        <h1>Welcome to your new Witchly.js app!</h1>
      </div>
    )
  }
  return { name, template }
}

export default Home
