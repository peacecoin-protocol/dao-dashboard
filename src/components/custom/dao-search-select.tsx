import { Input } from '~/components/ui/input'
import { shortenAddress } from '~/components/utils'

interface DaoOption {
  daoId: string
  daoName: string
}

interface DaoSearchSelectProps {
  daoSearch: string
  daoId: string
  allDAOs: DaoOption[]
  onDaoSearchChange: (value: string) => void
  onDaoIdChange: (value: string) => void
  labels: {
    dao?: string
    searchDao?: string
    noDaoFound?: string
  }
  className?: string
  inputClassName?: string
}

export const DaoSearchSelect = ({
  daoSearch,
  daoId,
  allDAOs,
  onDaoSearchChange,
  onDaoIdChange,
  labels,
  className = '',
  inputClassName = 'w-full h-8 text-sm mb-2',
}: DaoSearchSelectProps) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    // Clear selected DAO when new search starts
    if (daoSearch !== newValue) {
      onDaoIdChange('')
    }
    onDaoSearchChange(newValue)
  }

  const handleDaoSelect = (selectedDaoId: string) => {
    onDaoIdChange(selectedDaoId)
    onDaoSearchChange('') // Hide the dropdown after selecting
  }

  const filteredDAOs = allDAOs.filter(
    (dao: DaoOption) =>
      dao.daoName.toLowerCase().includes(daoSearch.toLowerCase()) ||
      dao.daoId.toLowerCase().includes(daoSearch.toLowerCase())
  )

  const selectedDAO = allDAOs.find((dao) => dao.daoId === daoId)

  return (
    <label
      className={`text-sm font-medium text-gray-700 flex flex-col gap-1 ${className}`}
    >
      {labels.dao || 'DAO'}
      <div className="flex flex-col gap-2">
        {/* Custom DAO dropdown with search box */}
        <div className="relative">
          <Input
            className={inputClassName}
            type="text"
            placeholder={labels.searchDao || 'Search DAO...'}
            value={daoSearch || ''}
            onChange={handleSearchChange}
          />
          {/* When searching, show dropdown; when not searching, don't show anything */}
          {daoSearch !== '' && !daoId && (
            <div className="border border-gray-300 rounded-md shadow-sm bg-white max-h-40 overflow-y-auto">
              {allDAOs && allDAOs.length > 0 && filteredDAOs.length > 0 ? (
                filteredDAOs.map((dao: DaoOption) => (
                  <div
                    key={dao.daoId}
                    className={`px-3 py-2 cursor-pointer hover:bg-blue-100 ${
                      daoId === dao.daoId ? 'bg-blue-50 font-semibold' : ''
                    }`}
                    onClick={() => handleDaoSelect(dao.daoId)}
                  >
                    {dao.daoName} &nbsp;|&nbsp; {shortenAddress(dao.daoId)}
                  </div>
                ))
              ) : (
                <div className="px-3 py-2 text-blue-600">
                  {labels.noDaoFound || 'No DAO found'}
                </div>
              )}
            </div>
          )}
          {/* Only display the selected DAO if not currently searching */}
          {daoId && selectedDAO && (
            <div className="mt-1 text-sm text-blue-600">
              {selectedDAO.daoName} | {shortenAddress(selectedDAO.daoId)}
            </div>
          )}
        </div>
      </div>
    </label>
  )
}
