import { CircularProgress } from '@mui/material'

interface LoaderProps {
  isLoading: boolean
}

function Loader ({
  isLoading = false
}: LoaderProps) {
  if (isLoading) {
    return (<div className="flex items-center gap-x-[8px]">
            <CircularProgress />
            <span>Loading...</span>
        </div>)
  } else {
    return <></>
  }
}

export { Loader }
