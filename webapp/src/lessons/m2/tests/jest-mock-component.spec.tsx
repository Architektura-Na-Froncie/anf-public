import './jest-mock-component-editor'
import { fireEvent, render } from "@testing-library/react"
import { Editor } from "./Editor"

interface ArticleProps {
  onChange: (value: string) => void
}

const Article: React.FC<ArticleProps> = (props) => {
  const { onChange } = props
  return <>
    <h2>article</h2>
    <Editor onChange={onChange}/>
  </>
}

test('component', () => {
  const spy = jest.fn()
  const { getByTestId } = render(<Article onChange={spy} />)

  const editor = getByTestId('texteditor')
  fireEvent.change(editor, { target: { value: "some text" } })

  expect(spy).toHaveBeenCalled()
})
