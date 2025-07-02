const Dashboard=()=>{
    return(
        <div className="grid grid-cols-2 gap-10 animate__animated animate__fadeIn" >
            <div className="shadow-lg p-6 flex items-start gap-4 rounded-lg ">
              <img src="https://images.klipfolio.com/website/public/bf9c6fbb-06bf-4f1d-88a7-d02b70902bd1/data-dashboard.png" 
              className="bg-gray-100 rounded-full w-[100px] h-[100px] border "
              />
              <div>
                <h1 className="text-2xl font-semibold">Part 1</h1>
                <label className="text-gray-500 text-lg" >16,666</label>
              </div>
            </div>
            
        </div>
    )
}

export default Dashboard