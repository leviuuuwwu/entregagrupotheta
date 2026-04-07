import { useEffect, useState } from "react"

export default function CompanyTable(){

  const [empresas,setEmpresas] = useState([])

  useEffect(()=>{

    fetch("http://localhost:3000/empresas")
      .then(res => res.json())
      .then(data=>{
        console.log("empresas:",data)
        setEmpresas(data)
      })
      .catch(err => console.error(err))

  },[])

  return(

    <div className="bg-white rounded-2xl shadow-sm p-6">

      <h1 className="text-xl font-bold mb-6 text-slate-800">
        Directorio de Empresas
      </h1>

      <div className="overflow-x-auto">

        <table className="w-full text-left border-collapse">

          <thead>
            <tr className="border-b border-slate-200 text-slate-500 text-sm">

              <th className="py-3">Empresa</th>
              <th className="py-3">Organizador</th>
              <th className="py-3">Email</th>

            </tr>
          </thead>

          <tbody>

            {empresas.map((empresa)=>(
              <tr
                key={empresa.company_id}
                className="border-b border-slate-100 hover:bg-slate-50"
              >

                <td className="py-4 font-medium text-slate-800">
                  {empresa.company_name}
                </td>

                <td className="py-4">
                  {empresa.organizer?.user_name}
                </td>

                <td className="py-4 text-slate-500">
                  {empresa.organizer?.user_email}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}