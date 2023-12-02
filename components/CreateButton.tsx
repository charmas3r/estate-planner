import {useRouter} from "next/router";

export const CreateButton = () => {
  const router = useRouter()

  return (
      <button className="btn btn-primary rounded-2xl"
              onClick={() => router.push('/new')}>Create a new trust contract</button>
  )
}