import { Input } from '../ui/input'
import { Button } from './button'

export default function AddDynamicInputFields({
  inputs,
  setInputs,
  isVerifySignature,
}: {
  inputs: { address: string; git: string }[]
  setInputs: (inputs: { address: string; git: string }[]) => void
  isVerifySignature: boolean
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
    <div className="space-y-4">
      {inputs.map((item, index) => (
        <div key={index} className="space-y-3">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              {!isVerifySignature && (
                <Input
                  name="address"
                  placeholder="Wallet Address"
                  type="text"
                  className="w-full"
                  value={item.address}
                  onChange={(event) => handleChange(event, index)}
                />
              )}
              {isVerifySignature && (
                <Input
                  name="git"
                  placeholder="Gist Username"
                  type="text"
                  className="w-full"
                  value={item.git}
                  onChange={(event) => handleChange(event, index)}
                />
              )}
            </div>
            {inputs.length > 1 && (
              <Button
                variant="outline"
                className="bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 rounded-md px-3 py-2 text-sm"
                onClick={() => handleDeleteInput(index)}
              >
                Delete
              </Button>
            )}
          </div>
          {index === inputs.length - 1 && (
            <Button
              variant="outline"
              className="bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 rounded-md px-3 py-2 text-sm w-full sm:w-auto"
              onClick={() => handleAddInput()}
            >
              Add Another
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}
