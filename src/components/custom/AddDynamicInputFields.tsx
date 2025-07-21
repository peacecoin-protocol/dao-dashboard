import { Input } from '../ui/input'
import { Button } from './button'

export default function AddDynamicInputFields({
  inputs,
  setInputs,
}: {
  inputs: { address: string; git: string }[]
  setInputs: (inputs: { address: string; git: string }[]) => void
}) {
  const handleAddInput = () => {
    setInputs([...inputs, { address: '', git: '' }])
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    let { name, value } = event.target
    let onChangeValue = [...inputs]
    if (onChangeValue[index]) {
      onChangeValue[index][name as keyof (typeof onChangeValue)[number]] = value
      setInputs(onChangeValue)
    }
  }

  const handleDeleteInput = (index: number) => {
    const newArray = [...inputs]
    newArray.splice(index, 1)
    setInputs(newArray)
  }

  return (
    <div className="flex flex-col gap-2">
      {inputs.map((item, index) => (
        <div className="flex flex-col gap-2" key={index}>
          <div className="flex flex-row gap-2">
            <Input
              name="address"
              placeholder="WalletAddress"
              type="text"
              value={item.address}
              onChange={(event) => handleChange(event, index)}
            />
            <Input
              name="git"
              placeholder="Gist Username"
              type="text"
              value={item.git}
              onChange={(event) => handleChange(event, index)}
            />
            {inputs.length > 1 && (
              <Button
                variant="outline"
                className="bg-red-500 text-white rounded-md"
                onClick={() => handleDeleteInput(index)}
              >
                Delete
              </Button>
            )}
          </div>
          {index === inputs.length - 1 && (
            <Button
              variant="outline"
              className="bg-green-500 text-white rounded-md"
              onClick={() => handleAddInput()}
            >
              Add
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
