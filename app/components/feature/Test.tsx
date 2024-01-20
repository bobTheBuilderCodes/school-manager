"use client"

const Test = () => {

    const addPost = async() => {
        await fetch("https://65a95f44219bfa371869216b.mockapi.io/api/v1/people", {
          method: 'POST',
          headers: {
            'Content-Type': 'Application/json'
          },
          body: JSON.stringify({
            fullname: "Robert",
            email: "myemail@gmail.com"
          })
        })
      }

  return (
    <form className="my-5" onSubmit={addPost}>
      <input type="Name" className="text-black" placeholder="Name" />
      <input type="Email" className="text-black" placeholder="Email"/>
      <button>Submit</button>
     </form>
  )
}

export default Test