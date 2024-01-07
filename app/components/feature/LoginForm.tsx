import {Button, Input, Card} from '..'

const LoginForm = () => {
  return (
    <form className="mt-12">
        <Card>
          <Input value="Hello" name="Hello" />
          <Input value="Hello" name="Hello" />
          <Button title="Log in" />
        </Card>
      </form>
  )
}

export default LoginForm