import { Link, useHistory } from "react-router-dom";
import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import millify from "millify";
import { SearchAsset } from "../services/cryptocompareApi";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import moment from "moment";

const HomePage = () => {
  const today = moment(new Date()).format("DD.MM.YYYY");
  const history = useHistory();
  const dispatch = useAppDispatch();

  const { assets } = useAppSelector((state) => state.crypto);
  const newsCategory = "Cryptocurrency";
  const { data: cryptoNews } = useGetCryptoNewsQuery({
    newsCategory,
    count: 7,
  });

  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

  const nextPage = (symbol: string, name: string, id: string, img: string) => {
    dispatch(SearchAsset(symbol, name.toLowerCase(), id, img));
    history.push(`/details/`+id);
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl">
        <div className="flex justify-between text-white items-center mb-8">
          <p className="text-2xl font-bold">Cryptocurrency list</p>
          <p className="">{today}</p>
        </div>

        <div className="border rounded-b text-gray-100 divide-y divide-gray-700 border-gray-700">
          {assets.coins &&
            assets.coins?.map(
              (crypto: {
                uuid: string;
                rank: string;
                symbol: string;
                name: string;
                iconUrl: string;
                price: number;
                marketCap: number;
                change: number;
              }) => (
                <div
                  key={crypto.uuid}
                  className="px-4 py-2 flex items-center justify-between hover:bg-gray-700"
                >
                  <div className="w-4/12">
                    <div className="flex items-center space-x-2">
                      <span>{crypto.rank}.</span>
                      <span className="text-blue-300">
                        <img
                          className="w-5 h-5 rounded-full overflow-hidden object-cover"
                          src={crypto.iconUrl}
                          alt={crypto.name}
                        />
                      </span>
                      <Link
                        to={`/details/`+crypto.uuid}
                        onClick={() =>
                          nextPage(
                            crypto.symbol,
                            crypto.name,
                            crypto.uuid,
                            crypto.iconUrl
                          )
                        }
                        className="hover:underline hover:text-blue-500"
                      >
                        {crypto.symbol} - {crypto.name}
                      </Link>
                    </div>
                  </div>
                  <div className="w-3/12">
                    <span className="text-gray-600">Price: </span>
                    {millify(crypto.price)}
                  </div>
                  <div className="w-3/12">
                    <span className="text-gray-600">Market Cap: </span>
                    {millify(crypto.marketCap)}
                  </div>

                  <div className="w-2/12 text-right">
                    <span className="text-gray-600">Daily Change </span>
                    <br />{" "}
                    <span
                      className={
                        crypto.change < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }
                    >
                      {millify(crypto.change)} %
                    </span>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
      <div className="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4">
        <div className="bg-gray-800 rounded-3xl px-6 pt-6">
          <div className="flex text-white text-2xl pb-6 font-bold">
            <p>Top cryptocurrency news</p>
          </div>
          <div>
            {cryptoNews &&
              cryptoNews.value.map((news: any, i: any) => (
                <Link
                  key={i}
                  to={{
                    pathname: `${news.url}`,
                  }}
                  target="_blank"
                >
                  <div className="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700">
                    <img
                      src={news?.image?.thumbnail || demoImage}
                      alt=""
                      className="object-cover w-10 h-10 rounded-md"
                    />
                    <div className="pl-4 w-full">
                      <div className="flex items-center justify-between w-full">
                        <div className="text-white font-medium">
                          {news.name}
                        </div>
                      </div>
                      <p className="my-2 text-sm text-gray-400">
                        {news.description.length > 100
                          ? `${news.description.substring(0, 100)}...`
                          : news.description}
                      </p>
                      <p className="text-right text-gray-400 text-sm">
                        {/* {moment(news.datePublished).startOf("ss").fromNow()} */}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
