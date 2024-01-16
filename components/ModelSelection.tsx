'use client'

import useSWR from 'swr'
import Select from 'react-select'

const fetchModels = () => fetch('/api/get-engines').then((res) => res.json())

const ModelSelection = () => {
  const { data: models, error, isLoading } = useSWR('models', fetchModels)
  const { data: model, mutate: setModel } = useSWR('model', {
    fallbackData: 'gpt-3.5-turbo-1106',
  })

  return (
    <div className='mt-2 text-black'>
      <Select
        className='mt-2 bg-slate-600'
        options={models}
        defaultValue={model}
        placeholder={model}
        isSearchable
        isLoading={isLoading}
        menuPosition='fixed'
        classNames={{
          control: () => '!bg-[#434654] !border-[#434654]',
          singleValue: () => '!text-gray-400',
        }}
        onChange={(e) => setModel(e.target)}
        id='selectbox'
        instanceId='selectbox'
      />
    </div>
  )
}

export default ModelSelection
